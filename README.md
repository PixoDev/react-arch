# React Arch

A VScode extension to generate React components from snippets based on React classes or React functions with tests.

You can create your own snippets, see the custom snippets section.



### Usage 

1. Open the command palette -- Windows Ctrl + Shift + P / MacOs Shift + ⌘ + P.
2. Choose Create React Class if you want to create a class component, React Function if you want a function component.
3. Type the directory and name, React Arch generates .tsx and .jsx files depending of the extension you provide,
the component will be generated in the root of the workspace folder you are working on.

#### Example

If you are in a directory called MyReactProject:

/header.tsx will generate a component in MyReactProject/header.tsx

If you want a nested one you can provide the path

/header/header.tsx generates a component in MyReactProject/header/header.tsx

NOTE: If the directory doesn't exist React Arch will generate it.
