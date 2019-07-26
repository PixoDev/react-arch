import { UserConfig } from "../models/userConfig.interface";

export const defaultConfig: UserConfig = {
    "settings": {
        "filenamePrefix": "",
        "filenameSuffix":"",
        "capitalizeFilename":true,
        "componentNamePrefix":"",
        "componentNameSuffix":"",
        "generateTestFile": true,
        "testFileSuffix": "spec",
        "independentTestFilesDirectory": false,
        "testsMirrorComponentsDirectory":false
    },
    "overrideSnippets": {
        "createClassComponent": [],
        "createFunctionComponent": [],
        "createTest": []
    },
    "customSnippets": {}
}