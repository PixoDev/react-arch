import { NamingGenerator } from "../../../component-types/namingGenerator";

export const classTemplateTSX = (naming: NamingGenerator): string => {

    return `
        import{-}React{-}from{-}'React';
        {-n-}
        {-n-}
        export{-}class{-}${naming.componentName}{-}extends{-}React.Component{-}{
        {-n-}
        {-n-}
        {----}render(){-}{
        {-n-}
        {----}{----}return{-}(
        {-n-}
        {----}{----}{----}<h1>${naming.componentName}{-}class{-}component{-}generated!</h1>
        {-n-}
        {----}{----})
        {-n-}
        {----}}
        {-n-}
        }
        `
}


