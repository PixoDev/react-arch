import { NamingGenerator } from "../../component-types/namingGenerator";
import { formatSnippet } from "../../utils/formatter";
import { testTemplateTSX } from "./templates/testTemplate";

export const TsxTestSnippet = (naming : NamingGenerator) : string => {
    let snippet
    snippet = testTemplateTSX(naming);
    
    if(snippet)return formatSnippet(snippet);
    
    return ""
}