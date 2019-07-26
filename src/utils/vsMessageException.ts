import * as vscode from 'vscode';
export class VsMessage extends Error {
    constructor(message: string, error:boolean = false) {
        super();
        error 
        ? vscode.window.showErrorMessage(message) 
        : vscode.window.showInformationMessage(message) 
    }
}