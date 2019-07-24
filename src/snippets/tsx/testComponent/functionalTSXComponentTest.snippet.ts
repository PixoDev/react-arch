import { NamingGenerator } from "../../../component-types/namingGenerator";

export const testJSXSnippet = (naming: NamingGenerator): string => {

    return `
        import{s}React{s}from{s}'react';{-jump-}
        import{s}ReactDOM{s}from{s}'react-dom';{-jump-}
        import{s}App{s}from{s}'./App';{-jump-}
        {-jump-}
        it('renders{s}without{s}crashing',{s}(){s}=>{s}{{-jump-}
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
        });

        import{s}React{s}from{s}'React';{-jump-}{-jump-}
        export{s}const{s}${naming.componentName}{s}={s}(props){s}=>{{-jump-}
        {-tab-}{-tab-}{-jump-}
        {-tab-}{-tab-}return (<h1>${naming.componentName}{s}class{s}component{s}generated!</h1>){-jump-}
        }
        `
}


