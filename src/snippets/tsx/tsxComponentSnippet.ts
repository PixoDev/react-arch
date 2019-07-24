import { NamingGenerator } from "../../component-types/namingGenerator";
import { functionalTSXSnippet } from "./functionalComponent/functionalTSXComponent.snippet";
import { formatSnippet } from "../../utils/formatter";
import { classTSXSnippet } from "./classComponent/classTSXcomponent.snippet";
export const TsxComponentSnippet = (naming : NamingGenerator, type: string) : string => {
    let snippet
    if(type === "function")snippet= functionalTSXSnippet(naming);
    if(type === "class")snippet= classTSXSnippet(naming);
    
    if(snippet)return formatSnippet(snippet);

    return ""
}