# webpack-react-boilerplate

- [Short HOW-TO](#short-how-to)
- [Detailed HOW-TO](#detailed-how-to)

# Short HOW-TO
1.  Initialize a project using [npm](https://docs.npmjs.com/cli/init/) or [yarn](https://classic.yarnpkg.com/ru/docs/cli/init/) and create a base project structure;
2.  Install [webpack](https://github.com/webpack/webpack/) and [webpack-cli](https://github.com/webpack/webpack-cli/);
3.  Create `webpack.config.js` in the directory root, add [context and entry points](https://webpack.js.org/configuration/entry-context/) and describe [output](https://webpack.js.org/configuration/output/) configuration;
4.  Add [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) for working with HTML;
5.  Add loaders you need:
    -	[css-loader](https://github.com/webpack-contrib/css-loader);
    -	[style-loader](https://github.com/webpack-contrib/style-loader) or loader from [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin);
    -   [less-loader](https://github.com/webpack-contrib/less-loader);
    -   [sass-loader](https://github.com/webpack-contrib/sass-loader);
    -   [file-loader](https://github.com/webpack-contrib/file-loader)
    
    etc;
6.  Add [babel](https://babeljs.io/docs/en/usage) and babel presets you need;
7.  Add [babel-loader](https://github.com/babel/babel-loader);
8.  Add [react and react-dom](https://github.com/facebook/react);
9.  Setup build scripts;
10. Setup [webpack-dev-server](https://webpack.js.org/configuration/dev-server/);
11. Setup [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/);
12. Setup optimization:
    -    [splitChunks](https://webpack.js.org/configuration/optimization/);
    -    [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) for js minifiynig;
    -    [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) for css minifying;
    -    option [minify {}](https://github.com/jantimon/html-webpack-plugin#minification) in html-webpack-plugin for html minifying;

# Detailed HOW-TO
1.  First of all, you need to initialize your project using [npm](https://docs.npmjs.com/cli/init/) or [yarn](https://classic.yarnpkg.com/ru/docs/cli/init/). Here and below, I'm going to use npm, but you can use yarn, it'll be similar.

```shell script
$ npm init
```
Then create a base project structure, for example:

```
  |- package.json
+ |- src/
+   |- index.js
+   |- index.html
```

2.  Install [webpack](https://github.com/webpack/webpack/) (a module bundler itself) and [webpack-cli](https://github.com/webpack/webpack-cli/) (a tool used to run webpack on the command line) as dev dependency.

```shell script
$ npm i webpack webpack-cli -D
```

3.  Create `webpack.config.js` in the directory root.

```
+ |- webpack.config.js
  |- package.json
  |- src/
    |- index.js
    |- index.html
```

2.  Add [context and entry points](https://webpack.js.org/configuration/entry-context/) and describe [output](https://webpack.js.org/configuration/output/) configuration; 

##### webpack.config.js
```js
const { resolve } = require('path')

const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: `./index.js`,
  output: {
    filename: filename('js'),
    path: resolve(__dirname, 'dist')
}
```

3.  For working with HTML install [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) as dev dependency and describe required parameters.

```shell script
$ npm i html-webpack-plugin -D
```

##### webpack.config.js
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new HtmlWebpackPlugin({
    template: `./index.html`,
  }),
]

module.exports = {
  /*
    ...
  */
  plugins,
}
```

4. Add the loaders you need.

First, add [css-loader](https://github.com/webpack-contrib/css-loader) to make webpack understand CSS syntax like `@import` and `url()`.

```shell script
$ npm i css-loader -D
```

##### webpack.config.js
```js
module.exports = {
  /*
    ...
  */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
    ]
  },
  /* plugins here */
}
```

If you want your CSS to be injected into `<head />` section in `index.html`, add [style-loader](https://github.com/webpack-contrib/style-loader).
It's important to place style-loader before css-loader, because webpack uses loaders from right to left.

```shell script
$ npm i style-loader -D
```

##### webpack.config.js
```js
module.exports = {
  /*
    ...
  */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
}
```

Otherwise, to extract CSS into separate files add [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin) and its loader.

```shell script
$ npm i mini-css-extract-plugin -D
```

##### webpack.config.js
```js

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = [
  /*
    ...
  */
  new MiniCssExtractPlugin({
    filename: filename('css'),
  }),
]

module.exports = {
  /*
    ... 
  */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ]
      },
    ]
  },
  plugins
}
```

Important: don't use `style-loader` и `MiniCssExtractPlugin.loader` together.

Add [file-loader](https://github.com/webpack-contrib/file-loader) to resolve imports on a file.

```shell script
$ npm i file-loader -D
```

##### webpack.config.js
```js
module.exports = {
  /* 
    ... 
  */
  module: {
    rules: [
      /* ... */
      {
        test: /\.(gif|png|jpg|jpeg|svg)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
      }
    ]
  },
}
```

If you are going to work with SASS or LESS add [sass-loader](https://github.com/webpack-contrib/sass-loader) and [less-loader](https://github.com/webpack-contrib/less-loader).

