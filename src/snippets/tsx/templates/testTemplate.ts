export const testTemplateTSX = (): string[] => {

    return [
        'import React from "react";',
        'import { create } from "react-test-renderer";',
        '',
        'describe("{-componentName-} test", () => {',
        '   const component = create(<{-componentName-}/>);',
        '   const instance = component.root;',
        '',
        '   test("{-componentName-} component should render", () => {',
        '       expect(component.toJSON()).toMatchSnapshot();',
        '   });',
        '})'
    ]
}

