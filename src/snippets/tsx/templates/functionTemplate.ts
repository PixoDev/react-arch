export const functionalTSXSnippet = (): string[] => {

    return [
        "import React from 'React';",
        'export const {-componentName-} = (props) => {',
        "",
        "   return (",
        '       <h1>{-componentName-} function component generated!</h1>',
        "   )",
        "}"
    ]
}


