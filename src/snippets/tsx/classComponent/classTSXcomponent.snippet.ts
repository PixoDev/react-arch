import { NamingGenerator } from "../../../component-types/namingGenerator";

export const classTSXSnippet = (naming: NamingGenerator): string => {

    return `
        import{s}React{s}from{s}'React';{-jump-}{-jump-}
        export{s}class{s}${naming.componentName}{s}extends{s}React.Component{s}{{-jump-}
        {-jump-}{-tab-}render(){
        {-tab-}{-tab-}{-jump-}
        {-tab-}{-tab-}return (<h1>${naming.componentName}{s}class{s}component{s}generated!</h1>){-jump-}
        {-tab-}}{-jump-}
        }
        `
}


