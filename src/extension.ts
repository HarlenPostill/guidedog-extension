import * as vscode from 'vscode';
import * as path from 'path';

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

    // Set the HTML content for the webview, which loads your React app
    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case 'buttonClick':
          vscode.window.showInformationMessage('Button clicked in the GuideDog sidebar (React)!');
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

export function deactivate() {}
