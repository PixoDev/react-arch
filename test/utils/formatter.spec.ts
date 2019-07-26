import { NamingGenerator } from "./namingGenerator";

export const formatSnippet = (content: string[], naming: NamingGenerator) => {
  
    let formattedContent = content.map((line) => {
        if(line.charAt(0) === " ") {
            line =  " " + line;
        }

        line = line.replace(new RegExp("{-componentName-}", "g"), naming.componentName);
        return line
    })
    return formattedContent;
}