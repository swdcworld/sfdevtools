// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let sfTerminal;

	// Deploy file command
	let deployDisposable = vscode.commands.registerCommand('sfdevtools.deployFile', function () {

		var isFileOpen = vscode.window.activeTextEditor;

		// check if the text editor is open or not
		if(isFileOpen){
			// get current file full path
			let currentFilePath = vscode.window.activeTextEditor.document.fileName;
			if(currentFilePath){
				// build relative file path
				let relativePath = 'force-app'+ currentFilePath.split('force-app')[1].split('.').slice(0, -1).join('.');
				
				// build final command
				let terminalCommand = 'sfdx force:source:deploy -p '+relativePath;
				executeCommandInTerminal(terminalCommand);
			}
		}
		// if text editor not open, the show error message
		else{
			// Display a message box to the user
			vscode.window.showErrorMessage('Open any file to deploy/retrieve');
		}
	});

	context.subscriptions.push(deployDisposable);

	// Retrieve file command
	let retrieveDisposable = vscode.commands.registerCommand('sfdevtools.retrieveFile', function () {
		var isFileOpen = vscode.window.activeTextEditor;

		// check if the text editor is open or not
		if(isFileOpen){
			// get current file full path
			let currentFilePath = vscode.window.activeTextEditor.document.fileName;
			if(currentFilePath){
				// build relative file path
				let relativePath = 'force-app'+ currentFilePath.split('force-app')[1].split('.').slice(0, -1).join('.');
				
				// build final command
				let terminalCommand = 'sfdx force:source:retrieve -p '+relativePath;
				executeCommandInTerminal(terminalCommand);
			}
		}
		// if text editor not open, the show error message
		else{
			// Display a message box to the user
			vscode.window.showErrorMessage('Open any file to deploy/retrieve');
		}
	});

	context.subscriptions.push(retrieveDisposable);

	// execute command
	function executeCommandInTerminal(terminalCommand) {
		// if terminal is already there, then close it
		if (sfTerminal) sfTerminal.dispose();
		
		// create new terminal
		sfTerminal = vscode.window.createTerminal('SFDevTools');
		sfTerminal.show();
		sfTerminal.sendText(terminalCommand);
		return sfTerminal;
	}
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
