import { DirUtils } from "../utils/dir-utils";
import * as vscode from 'vscode';
import { NamingGenerator } from "./namingGenerator";
import { TsxComponentSnippet } from "../snippets/tsx/tsxComponentSnippet";
import { join } from "path";
import { VsMessage } from "../utils/vsMessageException";
import { TsxTestSnippet } from "../snippets/tsx/tsxTestSnippet";

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
        let generatedComponent;
        let generatedTest;
        if(this.naming.extension === "tsx"){
            generatedComponent = this.dirUtils.generateFile(TsxComponentSnippet(this.naming, this.componentType));   
            generatedTest = this.dirUtils.generateTestFile(TsxTestSnippet(this.naming), this.naming);
        }
        
        if(this.naming.extension === "jsx"){
            //generated = this.dirUtils.generateFile(JsxComponentSnippet(this.naming));
        }

        if(generatedComponent && generatedTest) {
            throw new VsMessage(this.naming.componentFilename + " created succesfully");
        }

        else {
            throw new VsMessage("Cannot generate component", true);
        }
        
    }
}