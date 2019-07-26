export interface UserConfig {
    settings: Settings;
    overrideSnippets: OverrideSnippets;
    customSnippets: CustomSnippets;
}

interface CustomSnippets {
}

interface OverrideSnippets {
    createClassComponent: any[];
    createFunctionComponent: any[];
    createTest: any[];
}

interface Settings {
    filenamePrefix: string;
    filenameSuffix: string;
    capitalizeFilename: boolean;
    componentNamePrefix: string;
    componentNameSuffix: string;
    generateTestFile: boolean;
    testFileSuffix: string;
    independentTestFilesDirectory: boolean;
    testsMirrorComponentsDirectory: boolean;
}