1. Create 'dist' and 'src' folders

2. Run 'npm init'

3. Add 'index.html' to the src folder with next content:
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My app</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

4. npm install react react-dom

5. npm install --save-dev typescript

6. npm install --save-dev @types/react @types/react-dom

7. create tsconfig.json with next content:
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src", "webpack.dev.config.ts"]
}

Note that:
lib:                                The standard typing to be included in the type checking process. In our case, we have chosen to use the types for the browser’s DOM and the latest version of ECMAScript.
allowJs:                            Whether to allow JavaScript files to be compiled.
allowSyntheticDefaultImports:       This allows default imports from modules with no default export in the type checking process.
skipLibCheck:                       Whether to skip type checking of all the type declaration files (*.d.ts).
esModuleInterop:                    This enables compatibility with Babel.
strict:                             This sets the level of type checking to very high. When this is true, the project is said to be running in strict mode.
forceConsistentCasingInFileNames:   Ensures that the casing of referenced file names is consistent during the type checking process.
moduleResolution:                   How module dependencies get resolved, which is node for our project.
resolveJsonModule:                  This allows modules to be in .json files which are useful for configuration files.
noEmit:                             Whether to suppress TypeScript generating code during the compilation process. This is true in our project because Babel will be generating the JavaScript code.
jsx:                                Whether to support JSX in .tsx files.
include:                            These are the files and folders for TypeScript to check. In our project, we have specified all the files in the src folder.

8. add 'index.tsx' file into src folder with the following content
import React from "react";
import ReactDOM from "react-dom";

const App = () => (
  <h1>My React and TypeScript App!</h1>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

9. npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime @babel/runtime
@babel/core:                                        As the name suggests, this is the core Babel library.
@babel/preset-env:                                  This is a collection of plugins that allow us to use the latest JavaScript features but still target browsers that don’t support them.
@babel/preset-react:                                This is a collection of plugins that enable Babel to transform React code into JavaScript.
@babel/preset-typescript:                           This is a plugin that enables Babel to transform TypeScript code into JavaScript.
@babel/plugin-transform-runtime and @babel/runtime: These are plugins that allow us to use the async and await JavaScript features.

10. create '.babelrc' with the next content:
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
}

11. npm install --save-dev webpack webpack-cli

12. npm install --save-dev webpack-dev-server @types/webpack-dev-server

13. npm install --save-dev babel-loader

14. npm install --save-dev html-webpack-plugin

15. npm install --save-dev ts-node

16. add 'webpack.dev.config.ts'

const path = require('path');
import { Configuration, HotModuleReplacementPlugin } from "webpack";
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config: Configuration = {
    mode: "development",
    output: {
        publicPath: "/",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new HotModuleReplacementPlugin(),
    ],
    devtool: "inline-source-map",
    // @ts-ignore
    devServer: {
        static: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true
    },
};

export default config;

17. add to package.json:
"scripts": {
    "start": "webpack serve --config webpack.dev.config.ts",
},

18. npm install --save-dev fork-ts-checker-webpack-plugin @types/fork-ts-checker-webpack-plugin

19. add to webpack.dev.config.ts
...
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
...
plugins: [
        ...
        new ForkTsCheckerWebpackPlugin({
            async: false
        }),
    ],
...

20. npm install --save-dev clean-webpack-plugin

21. add webpack.prod.config.ts
import path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new CleanWebpackPlugin(),
    ],
};

export default config;

22. add to package.json
...,
  "scripts": {
    ...,
    "build": "webpack --config webpack.prod.config.ts",
  },
...