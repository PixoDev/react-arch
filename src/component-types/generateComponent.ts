import { DirUtils } from "../utils/dir-utils";
import * as vscode from 'vscode';
import { NamingGenerator } from "./namingGenerator";
import { TsxComponentSnippet } from "../snippets/tsx/tsxClassSnippet";
import { join } from "path";

export class ComponentGenerator {
    private dirUtils: DirUtils;
    private naming: NamingGenerator;
    private dir: string;
    constructor(inputPath: string, public componentType: string) {
        this.dir = "";
       
        this.naming = new NamingGenerator(inputPath);
        let workSpacePath;
        if(vscode.workspace.workspaceFolders) {
            workSpacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        
        if(workSpacePath){
            this.dir = join(workSpacePath, inputPath); 
        }
        this.dirUtils = new DirUtils(this.dir);
        this.generateComponent();
        this.generateTestingFile();
    }

    generateTestingFile() {  
        //this.dirUtils.generateDir(this.dir);
        //console.log("TEST CREATED -> " + dir);
    }


    generateComponent() {
        let generated;
        if(this.naming.extension === "tsx"){
            generated = this.dirUtils.generateFile(TsxComponentSnippet(this.naming, this.componentType));
        }
        
        if(this.naming.extension === "jsx"){
            //generated = this.dirUtils.generateFile(JsxComponentSnippet(this.naming));
        }

        if(generated) {
            vscode.window.showInformationMessage(this.naming.componentFilename + " created succesfully");
        }

        else {
            vscode.window.showErrorMessage("Component not generated");
        }
        
    }
}