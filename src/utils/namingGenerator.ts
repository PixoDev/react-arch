import { VsMessage } from "../utils/vsMessageException";
import { getUserConfig } from "./userConfig";
import { UserConfig } from "../models/userConfig.interface";

export class NamingGenerator {
    public componentName: string;
    public name: string;
    public componentFilename: string;
    public testFilename:string;
    public extension: string;
    public testExtension: string;
    public dirName: string;
    private userConfig: UserConfig | null;
    constructor(
        public inputPath: string
    ) {
        this.userConfig = getUserConfig();
        let inputArray = inputPath.split("/");
        let fileData = inputArray.slice(inputArray.length - 1)[0].split(".");
        this.name = fileData[0];
        
        this.dirName = this.generateDirName(inputPath);
        this.generateExtension(fileData);
        this.componentName = this.generateComponentName();
        this.testFilename = this.generateTestFilename();
        this.componentFilename = this.generateComponentFilename();
    }


    private generateDirName(inputPath: string): string {
        let inputArray: string[] = inputPath.split("/");
        let dir = "";

        inputArray.forEach(el => {
            if(el.indexOf("tsx") === -1 && el.indexOf("jsx") === -1 && el !== "") {
                dir += "/" + el;
            }
        })  

        console.log(dir);
        return dir
    };

    generateExtension(fileData: Array<string>) {
        this.extension = fileData[1]; 
        this.testExtension = "spec";
        if(!this.extension){
            new VsMessage("Specify a component extension, tsx or jsx", true);
            return false
        }

        if(this.extension !== ("tsx" || "jsx")) {
            new VsMessage(`${this.extension} is not a valid React Component extension`, true);
            return false
        }

        return true
    }

    private generateComponentName(): string {
        
        let componentName = this.capitalizeString(this.name);

        if(this.userConfig && this.userConfig.settings.componentNamePrefix) {
            componentName = this.userConfig.settings.componentNamePrefix + componentName;
        }

        if(this.userConfig && this.userConfig.settings.componentNameSuffix) {
            componentName = componentName + this.userConfig.settings.componentNameSuffix;
        }

        return componentName
    };


    private capitalizeString(input: string) {
        let capitalizedString = input.charAt(0).toUpperCase() +input.slice(1);

        return capitalizedString
    }

    private unCapitalizeString(input: string) {
        let unCapitalizedString = input.charAt(0).toLowerCase() +input.slice(1);

        return unCapitalizedString
    }

    private generateComponentFilename(addExtension = true): string {
        let filename = this.name;
        filename = this.capitalizeString(filename);
        if(this.userConfig.settings.filenamePrefix) {
            filename = this.userConfig.settings.filenamePrefix + filename;
        }
        if(this.userConfig.settings.filenameSuffix) {
            filename = filename + this.capitalizeString(this.userConfig.settings.filenameSuffix);
        }

        return (
            (this.userConfig.settings.capitalizeFilename 
            ? filename 
            : this.unCapitalizeString(filename)) + (addExtension ? "." + this.extension : ""));
    }

    private generateTestFilename(): string {
        let testFilename = this.generateComponentFilename(false);
        testFilename = this.capitalizeString(testFilename);
        if(this.userConfig.settings.testFileSuffix) {
            testFilename = testFilename + "." + this.userConfig.settings.testFileSuffix;
        }
        else {
            testFilename = testFilename + "." + this.testExtension;
        }
        
        return (this.userConfig.settings.capitalizeFilename ? testFilename : this.unCapitalizeString(testFilename)) + "." + this.extension;
    }
}