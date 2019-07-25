import * as vscode from 'vscode';
import { existsSync, readFileSync } from 'fs';
import { VsMessage } from './vsMessageException';
import { UserConfig } from '../models/userConfig.interface';
export const getUserConfig = (): UserConfig | null => {

    let folders = vscode.workspace.workspaceFolders
    let root;
    if (folders) {
        root = folders[0].uri.fsPath;
    }

    let jsonConfig = root + "/r-arch.config.json"
    if (existsSync(jsonConfig)) {
        try {
            return JSON.parse(readFileSync(jsonConfig, 'utf8'));
        } catch (e) {
            console.log(e);
            new VsMessage("Cannot read R-arch config");
        }
    } else {
        new VsMessage("R-arch config not found, using default config");
    }

    return null
}