import { NamingGenerator } from "../../../component-types/namingGenerator";

export const functionalJSXSnippet = (naming: NamingGenerator): string => {

    return `
        import{s}React{s}from{s}'React';{-jump-}{-jump-}
        export{s}const{s}${naming.componentName}{s}={s}(props){s}=>{{-jump-}
        {-tab-}{-tab-}{-jump-}
        {-tab-}{-tab-}return (<h1>${naming.componentName}{s}class{s}component{s}generated!</h1>){-jump-}
        }
        `
}


