
export class NamingGenerator {
    public componentName: string;
    public name: string;
    public componentFilename: string;
    public testFilename:string;
    public extension: string;
    constructor(
        public inputPath: string
    ) {
        let inputArray = inputPath.split("/");
        let fileData = inputArray.slice(inputArray.length - 1)[0].split(".");
        this.name = fileData[0];
        this.extension = fileData[1]; 
        this.componentName = this.generateComponentName();
        this.testFilename = this.generateTestFilename();
        this.componentFilename = this.generateComponentFilename();
    }

    private generateComponentName(): string {
        let componentName = (this.name.charAt(0).toUpperCase() + this.name.slice(1));

        return componentName
    };

    private generateComponentFilename(): string {
        return this.name + "." + this.extension
    }

    private generateTestFilename(): string {
    
        return this.name + ".spec." + this.extension;
    }
}