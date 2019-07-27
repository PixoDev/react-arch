import * as vscode from 'vscode';
import { existsSync } from 'fs';

export const goToFile = (path: string) => {
    if(existsSync(path)) {
        let uri = vscode.Uri.file(path)
        vscode.window.showTextDocument(uri)
    }
}