# React Arch
A VScode extension to generate React components from snippets based on React classes or React functions with their tests.
  

  
### Usage 

1. Open the command palette -- Windows Ctrl + Shift + P / MacOs Shift + ⌘ + P.
2. Choose Create React Class if you want to create a class component, React Function if you want a function component.
3. Type the directory and name, React Arch generates .tsx and .jsx files depending of the extension you provide,
the component will be generated in the root of the workspace folder you are working on.

![snippet-example](https://raw.githubusercontent.com/PixoDev/react-arch/dev/assets/react-arch-class.gif?token=AKHHIDLSDUPTCCNEEYWQJCK5HWIO6)


#### Example

If you are in a directory called MyReactProject:

/header.tsx will generate a component in MyReactProject/header.tsx

If you want a nested one you can provide the path

/header/header.tsx generates a component in MyReactProject/header/header.tsx

NOTE: If the directory doesn't exist React Arch will generate it.


### Custom config

You can set your own config.

1.Generate a r-arch.config.json file. Open the command palette -- Windows Ctrl + Shift + P / MacOs Shift + ⌘ + P. Choose React-arch create config.
2.Override the options as you wish.

### Overriding snippets

To override the snippets you can modify the corresponding JSON array with this syntax:



![snippet-example](https://raw.githubusercontent.com/PixoDev/react-arch/dev/assets/snippet-example.jpg?token=AKHHIDLOCS6KTPBLDFHPWQ25HWHXW)

Each line of the array is a line in the generated snippet.
Tabs and spaces are allowed.
To inserta a line break add an empty array item.
If you want to insert the component name variable use `{-componentName-}`.

