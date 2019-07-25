// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { FunctionalComponentGenerator } from './component-types/functionalComponentGenerator';
import { ClassComponentGenerator } from './component-types/classComponentGenerator';

export function activate(context: vscode.ExtensionContext) {

    let createFunctional = vscode.commands.registerCommand('extension.reactFunction', () => {
        vscode.window.showInputBox({
            value:'/lol/lol.tsx',
            prompt: `Create New Functional component relative to your current workspace folder root i.e: '/components/button.tsx`,
            ignoreFocusOut: true,
            valueSelection: [-1, -1]
        }).then(inputData => {
            if(inputData) new FunctionalComponentGenerator(inputData);
        })    
    });

    let createClass = vscode.commands.registerCommand('extension.reactClass', () => {
        vscode.window.showInputBox({
            value:'/',
            prompt: `Create New Class component relative to your current workspace folder root i.e: '/components/button.tsx`,
            ignoreFocusOut: true,
            valueSelection: [-1, -1]
        }).then(inputData => {
            if(inputData) new ClassComponentGenerator(inputData);
        })    
    });


    context.subscriptions.push(createFunctional);
    context.subscriptions.push(createClass);
}

export function deactivate() { }
