import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  const provider = new GuideDogSidebarProvider(context.extensionUri);
  vscode.window.registerWebviewViewProvider('guidedogView', provider);
}

class GuideDogSidebarProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    // Listen for messages from the react end webview
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case 'buttonClick':
          vscode.window.showInformationMessage('Running git branch in the background...');
          runInstallCommand();
          break;
        case 'buttonGit':
          vscode.window.showInformationMessage('Running git Normal in the background...');
          runGitCommand();
          break;
        default:
          console.error(`Unknown command: ${message.command}`);
      }
    });
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
