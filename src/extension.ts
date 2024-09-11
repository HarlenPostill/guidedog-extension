import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Register the Webview View Provider for the custom view
  const provider = new GuideDogSidebarProvider(context.extensionUri);
  vscode.window.registerWebviewViewProvider('guidedogView', provider);
}

class GuideDogSidebarProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    // Enable scripts in the webview
    webviewView.webview.options = {
      enableScripts: true
    };

    // Set the HTML content of the webview
    webviewView.webview.html = this.getHtmlContent(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'buttonClick':
          vscode.window.showInformationMessage(message.text);
          break;
      }
    });
  }

  // Function to return the HTML content for the webview
  private getHtmlContent(webview: vscode.Webview): string {
    return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>GuideDog Sidebar</title>
			</head>
			<body>
				<h1>GuideDog Sidebar</h1>
				<button id="myButton">Click Me!</button>

				<script>
					const vscode = acquireVsCodeApi();
					document.getElementById('myButton').addEventListener('click', () => {
						vscode.postMessage({ command: 'buttonClick', text: 'Hello from Webview!' });
					});
				</script>
			</body>
			</html>
		;`;
  }
}

// Deactivation function (optional)
export function deactivate() {}
