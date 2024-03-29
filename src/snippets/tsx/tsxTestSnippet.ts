import { NamingGenerator } from "../../utils/namingGenerator";
import { formatSnippet } from "../../utils/formatter";
import { testTemplateTSX } from "./templates/testTemplate";
import { getUserConfig } from "../../utils/userConfig";

export const TsxTestSnippet = (naming : NamingGenerator) : string[] => {
    let snippet
    let userConfig = getUserConfig();
    snippet = testTemplateTSX();
    
    if(snippet) {
        if(userConfig.overrideSnippets.createTest.length !== 0) {
            return formatSnippet(userConfig.overrideSnippets.createTest, naming)
        } else {
            return formatSnippet(snippet, naming);;
        }
        
    }
    
    return [""]
}