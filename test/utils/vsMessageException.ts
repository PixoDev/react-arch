import * as vscode from 'vscode';
export class VsMessage {
    constructor(message: string, error:boolean = false) {
        error 
        ? vscode.window.showErrorMessage(message) 
        : vscode.window.showInformationMessage(message) 
    }
}