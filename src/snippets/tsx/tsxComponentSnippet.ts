import { NamingGenerator } from "../../utils/namingGenerator";
import { functionalTSXSnippet } from "./templates/functionTemplate";
import { formatSnippet } from "../../utils/formatter";
import { classTemplateTSX } from "./templates/classTemplate";
import { getUserConfig } from "../../utils/userConfig";
export const TsxComponentSnippet = (naming : NamingGenerator, type: string) : string[] => {
    let snippet;
    let userConfig = getUserConfig();
    if(type === "function")snippet= functionalTSXSnippet(naming);
    if(type === "class")snippet= classTemplateTSX(naming);
    if(snippet) { 

        if(userConfig.overrideSnippets.createClassComponent.length !== 0 && type === "class") {
            return formatSnippet(userConfig.overrideSnippets.createClassComponent, naming)
        }
        
        if(userConfig.overrideSnippets.createFunctionComponent.length !== 0 && type === "function") {
            return formatSnippet(userConfig.overrideSnippets.createFunctionComponent, naming)
        }
        
        else {
            return formatSnippet(snippet, naming);;
        } 
        
    }
    
    return [""]
}