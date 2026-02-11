## Init Git repo

Initialise the repo locally

```bash
git init
```

Add `.gitignore` file with initial content

```text
node_modules
.idea
dist
```

## Init the project

```bash
npm init
```

## Specify the NodeJS engive version

Extend `package.json` file

```json
{
  "engines": {
    "node": ">=18 <21"
  }
}
```

## Install React

```bash
npm install --save react react-dom
```

## Install TypeScript

```bash
npm install --save-dev typescript
```

## Add TypeScript basic configuration

Create `tsconfig.json` file

```json
{
  "compilerOptions": {
    "target": "es5",
    "allowJs": true,
    "jsx": "react",
    "moduleResolution": "node",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```
3.js -----> webpack (babel) ----->  bundle.js
1.ts --->  webpack (ts-loader) ----|
2.ts --->  webpack (ts-loader) ----|


## Install Webpack dependencies

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
```

## Add basic webpack configuration

Create `webpack.config.js` file

```js
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
```

## Install Babel

```bash
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript
```

## Add Babel configuration

Create `.babelrc` file

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

## Integrate Babel with Webpack

```js
module.exports = {
  // ... existing configuration
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
```

## Add ts-loader

```bash
  npm i ts-loader --dev
```

Update webpack configuration

```js
module.exports = {
  // ... existing configuration
  module: {
    rules: [
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: "ts-loader",
            options: {
                transpileOnly: false, // Ensures type checking
            },
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }
    ]
  }
};
```

## Create `src` directory

Create `./src` directory


## Add HTML template file

Create `./public/index.html` file with 

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack React TS</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## Add HTML Webpack plugin

```bash
npm install --save-dev html-webpack-plugin
```

Update the Webpack configuration

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Existing Code
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
```

## Add npm commands

Extend `scripts` section in `package.json` with

```json
{
  "start": "webpack serve --open --mode=development",
  "build": "webpack --mode production"
}
```

## Add types for React lib

```bash
npm install --save @types/react
npm install --save @types/react-dom
```

## Add linting

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks
npm install @eslint/compat globals @eslint/js @eslint/eslintrc -D

```

Add configuration file `eslint.config.mjs`

```js
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
}];
```

Extend `scripts` section in `package.json` with

```json
{
  "lint": "eslint 'src/**/*.{ts,tsx}'",
  "lint:fix": "eslint 'src/**/*.{ts,tsx}' --fix"
}
```

## Add CSS Modules support

```bash
npm install --save-dev style-loader typescript-plugin-css-modules
npm install --save-dev css-loader
```

Extend `module.rules` in webpack config file

```js
{
    test: /\.css$/i,
        use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                esModule: false,
                modules: {
                    localIdentName: '[local]--[name]--[hash:base64:5]'
                }
            }
        }
    ]
}
```

Add `d.ts` file with CSS type definition. Create `globa.d.ts` file with

```ts
declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}
```


## Install pre-commit hook


Install husky

```bash
npm install --save-dev husky
```

Extend `package.json` with `lint-staged` configuration

```json
{
  "lint-staged": {
    "*.ts": [
      "npm run lint"
    ],
    "*.tsx": [
      "npm run lint"
    ]
  }
}
```

Extend `package.json` with husky configuration

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }  
}
```

Install `lint-staged`

```bash
npm install lint-staged --save-dev
```

Init `husky`

```text
#npx husky init
```

Add pre-commit hook

manually update `./husky/pre-commit` file with 

```text
npx lint-staged
```

