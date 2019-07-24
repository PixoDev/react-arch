import { NamingGenerator } from "../../component-types/naming-generator";
import { functionalJSXSnippet } from "./functionalComponent/functionalJSXComponent.snippet";
import { formatSnippet } from "../../utils/formatter";
import { classJSXSnippet } from "./classComponent/classJSXcomponent.snippet";
export const TsxComponentSnippet = (naming : NamingGenerator, type: string) : string => {
    let snippet
    if(type === "function")snippet= functionalJSXSnippet(naming);
    if(type === "class")snippet= classJSXSnippet(naming);
    
    if(snippet)return formatSnippet(snippet);

    return ""
}