export const formatSnippet = (content: string): string => {
    
    let removeJumps = content.replace(/(\r\n|\n|\r)/gm,"");
    let removeSpaces = removeJumps.replace(/\s+/g,"");

    let i = removeSpaces.replace(new RegExp("{----}", 'g'), "\t");
    let b = i.replace(new RegExp("{-n-}", "g"), "\n");

    return b.replace(new RegExp("{-}", "g"), " ");
}