import { NamingGenerator } from "../../component-types/namingGenerator";
import { functionalTSXSnippet } from "./templates/functionTemplate";
import { formatSnippet } from "../../utils/formatter";
import { classTemplateTSX } from "./templates/classTemplate";
export const TsxComponentSnippet = (naming : NamingGenerator, type: string) : string => {
    let snippet
    if(type === "function")snippet= functionalTSXSnippet(naming);
    if(type === "class")snippet= classTemplateTSX(naming);
    
    if(snippet)return formatSnippet(snippet);
    
    return ""
}