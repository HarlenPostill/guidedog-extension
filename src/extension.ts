import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import * as fs from 'fs/promises';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
  const provider = new GuideDogSidebarProvider(context.extensionUri);
  context.subscriptions.push(vscode.window.registerWebviewViewProvider('guidedogView', provider));
}

class GuideDogSidebarProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;
  private _suggestions: any = null;
  private _resultsPath: string = '';

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    this._postActiveFilePath(webviewView);
    this._loadSuggestions(webviewView);
    this._checkGuideDogFolder(webviewView);

    // scan for active editor changes
    vscode.window.onDidChangeActiveTextEditor(() => {
      this._postActiveFilePath(webviewView);
    });

    // Listen for messages from the react end webview
    webviewView.webview.onDidReceiveMessage(async message => {
      switch (message.command) {
        case 'buttonClick':
          vscode.window.showInformationMessage('Running git branch in the background...');
          runInstallCommand();
          break;
        case 'buttonGit':
          vscode.window.showInformationMessage('Running git Normal in the background...');
          runGitCommand();
          break;
        case 'openFile':
          this._openFile(message.fileName, message.lineNumber);
          break;
        case 'replaceLine':
          this._replaceLine(message.fileName, message.lineNumber, message.newContent);
          break;
        case 'getSuggestions':
          this._sendSuggestions(webviewView);
          break;
        case 'removeIssue':
          this._removeIssue(message.fileName, message.lineNumber, message.issueType);
          break;
        case 'getHistoryIssues':
          this._sendHistoryIssues(webviewView);
          break;
        case 'checkGuideDogFolder':
          this._checkGuideDogFolder(webviewView);
          break;
        case 'initGuidedog':
          try {
            // Send initial status
            webviewView.webview.postMessage({
              command: 'installStatus',
              status: 'installing',
              progress: 0,
            });

            // Install package
            await execAsync('npm install @marcelqt/guidedog', {
              cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath,
            });

            // Update progress
            webviewView.webview.postMessage({
              command: 'installStatus',
              status: 'installing',
              progress: 50,
            });

            // Run init command
            await execAsync(`npx @marcelqt/guidedog init --apiKey "${message.apiKey}"`, {
              cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath,
            });

            // Send success
            webviewView.webview.postMessage({
              command: 'installStatus',
              status: 'complete',
              progress: 100,
            });
          } catch (error: any) {
            webviewView.webview.postMessage({
              command: 'installStatus',
              status: 'error',
              error: error.message,
            });
          }
          break;
        case 'runGuideDogCheck':
          try {
            const process = exec('npx @marcelqt/guidedog check', {
              cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath,
            });

            webviewView.webview.postMessage({
              command: 'checkStatus',
              status: 'running',
            });

            process.on('exit', code => {
              webviewView.webview.postMessage({
                command: 'checkStatus',
                status: code === 0 ? 'complete' : 'error',
              });

              if (code === 0) {
                vscode.commands.executeCommand('workbench.action.reloadWindow');
              }
            });

            // Handle potential errors
            process.on('error', error => {
              webviewView.webview.postMessage({
                command: 'checkStatus',
                status: 'error',
                error: error.message,
              });
            });
          } catch (error: any) {
            webviewView.webview.postMessage({
              command: 'checkStatus',
              status: 'error',
              error: error.message,
            });
          }
          break;
        case 'getFileModTime':
          this._getFileModTime(webviewView);
          break;
        case 'reloadWebview':
          vscode.window
            .showInformationMessage('GuideDog check completed. Reloading window...', 'Reload')
            .then(selection => {
              if (selection === 'Reload') {
                vscode.commands.executeCommand('workbench.action.reloadWindow');
              }
            });
          break;
        default:
          console.error(`Unknown command: ${message.command}`);
      }
    });
  }

  private async _getFileModTime(webviewView: vscode.WebviewView) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const suggestionsPath = path.join(rootPath, '.guidedog', 'suggestions.json');

    try {
      const stats = await fs.stat(suggestionsPath);
      webviewView.webview.postMessage({
        command: 'fileModTime',
        modTime: stats.mtime.toISOString(),
      });
    } catch (error) {
      console.error('Error getting file modification time:', error);
    }
  }

  private async _checkGuideDogFolder(webviewView: vscode.WebviewView) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('GuideDog folder not found.');
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const guideDogPath = path.join(rootPath, '.guidedog');

    try {
      await fs.access(guideDogPath);
      // Folder exists, skip animation
      webviewView.webview.postMessage({
        command: 'guideDogFolderExists',
        exists: true,
      });
    } catch {
      // Folder doesn't exist, show animation
      webviewView.webview.postMessage({
        command: 'guideDogFolderExists',
        exists: false,
      });
    }
  }

  private async _loadSuggestions(webviewView: vscode.WebviewView) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder is open');
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const suggestionsPath = path.join(rootPath, '.guidedog', 'suggestions.json');
    this._resultsPath = path.join(rootPath, '.guidedog', 'results.json');

    try {
      const data = await fs.readFile(suggestionsPath, 'utf8');
      this._suggestions = JSON.parse(data);
      this._sendSuggestions(webviewView);
    } catch (error) {
      console.error(`Error reading or parsing suggestions file: ${error}`);
    }
  }

  private async _removeIssue(fileName: string, lineNumber: number, issueType: string) {
    if (!this._suggestions) {
      return;
    }

    const fileIndex = this._suggestions.findIndex((file: any) => file.fileName === fileName);
    if (fileIndex === -1) {
      return;
    }

    const issueIndex = this._suggestions[fileIndex].issues.findIndex(
      (issue: any) => issue.lineNumber === lineNumber && issue.type === issueType
    );
    if (issueIndex === -1) {
      return;
    }

    const removedIssue = this._suggestions[fileIndex].issues.splice(issueIndex, 1)[0];

    if (this._suggestions[fileIndex].issues.length === 0) {
      this._suggestions.splice(fileIndex, 1);
    }

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const suggestionsPath = path.join(rootPath, '.guidedog', 'suggestions.json');

    try {
      await fs.writeFile(suggestionsPath, JSON.stringify(this._suggestions, null, 2));
    } catch (error) {
      console.error(`Error updating suggestions file: ${error}`);
    }

    // Add to results.json stuff
    try {
      let results = [];
      try {
        const resultsData = await fs.readFile(this._resultsPath, 'utf8');
        results = JSON.parse(resultsData);
      } catch (error) {}

      const fileResult = results.find((file: any) => file.fileName === fileName);
      if (fileResult) {
        fileResult.issues.push({
          ...removedIssue,
          timeAdded: new Date().toISOString(),
        });
      } else {
        results.push({
          fileName,
          issues: [
            {
              ...removedIssue,
              timeAdded: new Date().toISOString(),
            },
          ],
        });
      }

      await fs.writeFile(this._resultsPath, JSON.stringify(results, null, 2));
    } catch (error) {
      console.error(`Error updating results file: ${error}`);
    }

    if (this._view) {
      this._sendSuggestions(this._view);
    }
  }

  private async _sendHistoryIssues(webviewView: vscode.WebviewView) {
    try {
      const resultsData = await fs.readFile(this._resultsPath, 'utf8');
      const results = JSON.parse(resultsData);
      webviewView.webview.postMessage({
        command: 'updateHistoryIssues',
        historyIssues: results,
      });
    } catch (error) {
      console.error(`Error reading or parsing results file: ${error}`);
      webviewView.webview.postMessage({
        command: 'updateHistoryIssues',
        historyIssues: [],
      });
    }
  }

  private _sendSuggestions(webviewView: vscode.WebviewView) {
    if (this._suggestions) {
      webviewView.webview.postMessage({
        command: 'updateSuggestions',
        suggestions: this._suggestions,
      });
    }
  }

  private async _openFile(fileName: string, lineNumber: number) {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder is open');
        return;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      const fullPath = path.join(rootPath, fileName);

      const document = await vscode.workspace.openTextDocument(fullPath);
      const editor = await vscode.window.showTextDocument(document);

      const range = editor.document.lineAt(lineNumber - 1).range;
      editor.selection = new vscode.Selection(range.start, range.end);
      editor.revealRange(range, vscode.TextEditorRevealType.InCenter);

      const lineContent = document.lineAt(lineNumber - 1).text;

      if (this._view) {
        this._view.webview.postMessage({
          command: 'fileOpened',
          fileName,
          lineNumber,
          lineContent,
        });
      }

      vscode.window.showInformationMessage(`Opened ${fileName} at line ${lineNumber}`);
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to open file: ${error}`);
      if (this._view) {
        this._view.webview.postMessage({
          command: 'fileError',
          message: `Failed to open the file ${fileName}`,
        });
      }
    }
  }

  private _postActiveFilePath(webviewView: vscode.WebviewView) {
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor && this._view) {
      const fullPath = activeEditor.document.uri.fsPath;
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (workspaceFolder) {
        const relativePath = vscode.workspace.asRelativePath(fullPath, false);
        webviewView.webview.postMessage({ command: 'setFilePath', filePath: relativePath });
        console.log('Sent relative file path:', relativePath); // Debugs delete after
      } else {
        console.log('No workspace folder found');
      }
    } else {
      console.log('No active editor');
    }
  }

  private async _replaceLine(fileName: string, lineNumber: number, newContent: string) {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder is open');
        return;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      const fullPath = path.join(rootPath, fileName);

      const document = await vscode.workspace.openTextDocument(fullPath);
      const editor = await vscode.window.showTextDocument(document);

      const range = editor.document.lineAt(lineNumber - 1).range;
      const originalLine = editor.document.lineAt(lineNumber - 1).text;

      const indentationMatch = originalLine.match(/^(\s*)/);
      const indentation = indentationMatch ? indentationMatch[1] : '';

      const indentedNewContent = indentation + newContent.trim();

      await editor.edit(editBuilder => {
        editBuilder.replace(range, indentedNewContent);
      });

      if (this._view) {
        this._view.webview.postMessage({
          command: 'lineReplaced',
          fileName,
          lineNumber,
          newContent: indentedNewContent,
        });
      }

      vscode.window.showInformationMessage(`Replaced line ${lineNumber} in ${fileName}`);
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to replace line: ${error}`);
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview.js')
    );

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>GuideDog Sidebar</title>
      </head>
      <body>
          <div id="root"></div>
          <script src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}

// Function to run the `npm install guidedog` command in the background using child_process (will not show the terminal)
function runInstallCommand() {
  exec('npm install guidedog', (error, stdout, stderr) => {
    if (error) {
      vscode.window.showErrorMessage(`Error installing GuideDog you need NPM: ${error.message}`);
      return;
    }
    if (stderr) {
      vscode.window.showErrorMessage(`Install stderr: ${stderr}`);
      return;
    }
    vscode.window.showInformationMessage(`Installed Successfully:\n${stdout}`);
  });
}

function runGitCommand() {
  exec('git help -a', (error, stdout, stderr) => {
    if (error) {
      vscode.window.showErrorMessage(`Error running git: ${error.message}`);
      return;
    }
    if (stderr) {
      vscode.window.showErrorMessage(`Git stderr: ${stderr}`);
      return;
    }
    vscode.window.showInformationMessage(`Git:\n${stdout}`);
  });
}

export function deactivate() {}
