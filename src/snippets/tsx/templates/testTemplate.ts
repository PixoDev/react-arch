import { NamingGenerator } from "../../../component-types/namingGenerator";

export const testTemplateTSX = (naming: NamingGenerator): string => {

    return `
        import{-}React{-}from{-}"react";
        {-n-}
        import{-}{{-}create{-}}{-}from{-}"react-test-renderer";
        {-n-}
        {-n-}
        describe("${naming.componentName}{-}component{-}should{-}render",{-}(){-}=>{-}{
        {-n-}
        {----}const{-}component{-}={-}create(<${naming.componentName}/>);
        {-n-}
        {----}const{-}instance{-}={-}component.root;
        {-n-}
        {-n-}
        {----}test("${naming.componentName}{-}component{-}should{-}render",{-}(){-}=>{-}{
        {-n-}
        {----}{----}expect(component.toJSON()).toMatchSnapshot();
        {-n-}
        {----}});
        {-n-}
        });
        `
}


