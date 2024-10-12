import * as vscode from 'vscode';
import { exec } from 'child_process';
import path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const provider = new GuideDogSidebarProvider(context.extensionUri);
  vscode.window.registerWebviewViewProvider('guidedogView', provider);
}

class GuideDogSidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    // Listen for messages from the react end webview
    webviewView.webview.onDidReceiveMessage(message => {
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
        default:
          console.error(`Unknown command: ${message.command}`);
      }
    });
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

      vscode.window.showInformationMessage(`Opened ${fileName} at line ${lineNumber}`);
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to open file: ${error}`);
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
      vscode.window.showErrorMessage(`Error installing GuideDog: ${error.message}`);
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
