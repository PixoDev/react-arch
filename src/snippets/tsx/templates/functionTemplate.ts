import { NamingGenerator } from "../../../component-types/namingGenerator";

export const functionalTSXSnippet = (naming: NamingGenerator): string => {

    return `
        import{s}React{s}from{s}'React';{-jump-}{-jump-}
        export{s}const{s}${naming.componentName}{s}={s}(props){s}=>{{-jump-}
        {-tab-}{-tab-}{-jump-}
        {-tab-}return ({-jump-}{-tab-}{-tab-}<h1>${naming.componentName}{s}function{s}component{s}generated!</h1>{-jump-}{-tab-}){-jump-}
        }
        `
}


