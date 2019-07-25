import { DirUtils } from "../utils/dir-utils";
import * as vscode from 'vscode';
import { NamingGenerator } from "../utils/namingGenerator";
import { TsxComponentSnippet } from "../snippets/tsx/tsxComponentSnippet";
import { join } from "path";
import { VsMessage } from "../utils/vsMessageException";
import { TsxTestSnippet } from "../snippets/tsx/tsxTestSnippet";
import { UserConfig } from "../models/userConfig.interface";
import { getUserConfig } from "../utils/userConfig";

export class ComponentGenerator {
    private dirUtils: DirUtils;
    private naming: NamingGenerator;
    private dir: string;
    private userConfig: UserConfig | null;
    constructor(inputPath: string, public componentType: string) {
        this.dir = "";
        this.userConfig = getUserConfig();
        this.naming = new NamingGenerator(inputPath);
        let workSpacePath;
        if (vscode.workspace.workspaceFolders) {
            workSpacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }

        if (workSpacePath) {
            let name
            this.dir = join(workSpacePath,"/" + this.naming.componentFilename);
        }
        this.dirUtils = new DirUtils(this.dir);
        this.generateComponent();
    }



    generateComponent() {
        let generatedComponent;
        let generatedTest;
        if (this.naming.extension === "tsx") {
            generatedComponent = this.dirUtils.generateFile(TsxComponentSnippet(this.naming, this.componentType));
            console.log("generate file");
            if(this.userConfig && !this.userConfig.settings.generateTestFile) {
                
            }
            if(this.userConfig && this.userConfig.settings.generateTestFile || !this.userConfig) {
                generatedTest = this.dirUtils.generateTestFile(TsxTestSnippet(this.naming), this.naming);
            }
        }

        if (this.naming.extension === "jsx") {
            //generated = this.dirUtils.generateFile(JsxComponentSnippet(this.naming));
        }

        if (generatedComponent) {
            throw new VsMessage(this.naming.componentFilename + " created succesfully");
        }

        else {
            throw new VsMessage("Cannot generate component", true);
        }

    }
}