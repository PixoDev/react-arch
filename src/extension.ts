// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { getUserConfig } from './utils/userConfig';
import { ComponentGenerator } from './component/generateComponent';
import { generateUserConfig } from './config/generateUserConfig';

export function activate(context: vscode.ExtensionContext) {
    let createFunctional = vscode.commands.registerCommand('extension.reactArchFunctionComponent', () => {
        let config = getUserConfig();
        console.log("SETTINGS", config);
        vscode.window.showInputBox({
            value:'/',
            prompt: `Create New Functional component relative to your current workspace folder root i.e: '/components/button.tsx`,
            ignoreFocusOut: true,
            valueSelection: [-1, -1]
        }).then(inputData => {
            if(inputData) new ComponentGenerator(inputData, "function");
        })    
    });

    let createClass = vscode.commands.registerCommand('extension.reactArchClassComponent', () => {
        vscode.window.showInputBox({
            value:'/',
            prompt: `Create New Class component relative to your current workspace folder root i.e: '/components/button.tsx`,
            ignoreFocusOut: true,
            valueSelection: [-1, -1]
        }).then(inputData => {
            if(inputData) new ComponentGenerator(inputData, "class");
        })    
    });

    let createConfig = vscode.commands.registerCommand('extension.reactArchGenerateConfig' , () => {
        generateUserConfig();
    });

    context.subscriptions.push(createFunctional);
    context.subscriptions.push(createClass);
    context.subscriptions.push(createConfig);
}

export function deactivate() { }
