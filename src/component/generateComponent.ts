import { DirUtils } from "../utils/dirUtils";
import * as vscode from 'vscode';
import { NamingGenerator } from "../utils/namingGenerator";
import { TsxComponentSnippet } from "../snippets/tsx/tsxComponentSnippet";
import { join } from "path";
import { VsMessage } from "../utils/vsMessageException";
import { TsxTestSnippet } from "../snippets/tsx/tsxTestSnippet";
import { UserConfig } from "../models/userConfig.interface";
import { getUserConfig } from "../utils/userConfig";
import { goToFile } from "../utils/goToFile";

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
        this.dir = join(workSpacePath, this.naming.dirName, "/" + this.naming.componentFilename);
        console.log("DIRRR", this.dir);

        this.dirUtils = new DirUtils(this.dir);
        this.generateComponent();
    }



    generateComponent() {
        let generatedComponent;
        let generatedTest;
        if (this.naming.extension === "tsx") {

            if (generatedComponent = this.dirUtils.generateFile(TsxComponentSnippet(this.naming, this.componentType))) {
                goToFile(this.dir)
            };

            if (this.userConfig.settings.generateTestFile || !this.userConfig) {
                generatedTest = this.dirUtils.generateTestFile(TsxTestSnippet(this.naming), this.naming);
            }
        }

        if (this.naming.extension === "jsx") {
            //generated = this.dirUtils.generateFile(JsxComponentSnippet(this.naming));
        }

        if (generatedComponent) {
            new VsMessage(this.naming.componentFilename + " created succesfully");
        }

        else {
            new VsMessage("Cannot generate component", true);
        }

    }
}