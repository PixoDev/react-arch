
export const classTemplateTSX = (): string[] => {

    return [
        "import React from 'React'",
        "",
        'export class {-componentName-} extends React.Component {',
        "",
        "   render() {",
        "       return (",
        '           <h1>{-componentName-} class component generated!</h1>',
        "       )",
        "   }",
        "}"
    ]
}


