# webpack-react-boilerplate

# About
This is just an attempt to gather all Webpack setup information in one place.

# Table of contents

- [Short HOW-TO](#short-how-to)
- [Detailed HOW-TO](#detailed-how-to)

# Short HOW-TO
1.  Initialize a project using [npm](https://docs.npmjs.com/cli/init/) or [yarn](https://classic.yarnpkg.com/ru/docs/cli/init/) and create a basic project structure;
2.  Install [webpack](https://github.com/webpack/webpack/) and [webpack-cli](https://github.com/webpack/webpack-cli/);
3.  Create `webpack.config.js` in the directory root, add basic [context and entry points](https://webpack.js.org/configuration/entry-context/) and describe [output](https://webpack.js.org/configuration/output/) configuration;
4.  Set up build scripts, caching and add [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin);
5.  To work with HTML, add [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin);
6.  Add loaders you need:
    -	[css-loader](https://github.com/webpack-contrib/css-loader);
    -	[style-loader](https://github.com/webpack-contrib/style-loader) or loader from [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin);
    -   [less-loader](https://github.com/webpack-contrib/less-loader);
    -   [sass-loader](https://github.com/webpack-contrib/sass-loader);
    -   [file-loader](https://github.com/webpack-contrib/file-loader)
    etc;
7.  Add [babel](https://babeljs.io/docs/en/usage), [babel-loader](https://github.com/babel/babel-loader) and babel presets you need;
8.  Add [react and react-dom](https://github.com/facebook/react);
9. Set up [webpack-dev-server](https://webpack.js.org/configuration/dev-server/);
10. Set up the [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/);
11. Set up the optimization:
    -    [splitChunks](https://webpack.js.org/configuration/optimization/);
    -    [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) for JavaScript minification;
    -    [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) for CSS minification;
    -    option [minify {}](https://github.com/jantimon/html-webpack-plugin#minification) in html-webpack-plugin for html minification;

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

3. Create `webpack.config.js` in the directory root.

```
+ |- webpack.config.js
  |- package.json
  |- src/
    |- index.js
    |- index.html
```

Add basic [context and entry points](https://webpack.js.org/configuration/entry-context/) and describe [output](https://webpack.js.org/configuration/output/) configuration.

##### webpack.config.js
```js

const { resolve } = require('path')

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: `./index.js`,
  output: {
    filename: `[name].js`,
    path: resolve(__dirname, 'dist')
  }
}

```

4. Set up the build scripts.

Install [cross-env](https://github.com/kentcdodds/cross-env) to set and use environment variables across platform.

```shell script
$ npm i cross-env -D
```

Edit `scripts` field in `package.json`.

##### package.json
```json
{
    "scripts": {
        "dev": "cross-env NODE_ENV=development webpack --mode development",
        "build": "cross-env NODE_ENV=production webpack --mode production"
    }
}
```

Update `webpack.config.js` as follows. Add `isDev` variable, and create `filename` function for preventing cache problems.

##### webpack.config.js
```js
/* ... */

const isDev = process.env.NODE_ENV === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
  /* ... */
  output: {
    filename: filename('js'),
    /* ... */
  }
}

```

Then install [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin) for automatically cleaning the build directory.

```shell script

$ npm i clean-webpack-plugin -D

```

And add it to the `plugins` array in `webpack.config.js`

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const plugins = [
  new CleanWebpackPlugin(),
]

module.exports = {
  /*
    ...
  */
  plugins,
}

```

5.  To work with HTML, install [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

```shell script
$ npm i html-webpack-plugin -D
```

and describe required parameters in `webpack.config.js`.

##### webpack.config.js
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  /* ... */
  new HtmlWebpackPlugin({
    template: `./index.html`,
  }),
]
```

6. Add the loaders you need.

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
  /* ... */
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

Otherwise, to extract CSS into separate files, add [MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin) and its loader.

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

7.  To convert ECMAScript 2015+ code into a compatible JavaScript version in current and older browsers you need to set up [Babel](https://babeljs.io/docs/en/usage). To do this, install the required packages and edit the configuration file as follows.

```shell script
$ npm i @babel/core @babel/preset-env babel-loader -D
```

##### webpack.config.js
```js
module.exports = {
  /* ... */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ]
          }
        }
      },
      /* ... */
    ]
  },
}
```

8.  Install `react` and `react-dom` to work with React.

```shell script
$ npm i react react-dom
```

To make Babel transform JSX syntax, install `@babel/preset-react` with

```shell script
$ npm i @babel/preset-react -D
```

and add it to presets array in `webpack.config.js`.

##### webpack.config.js
```js
module.exports = {
  /* ... */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              /* ... */
              '@babel/preset-react',
            ]
          }
        }
      },
      /* ... */
    ]
  },
}
```

8.  Set up [webpack-dev-server](https://webpack.js.org/configuration/dev-server/);.

Install `webpack-dev-server` with

```shell script
$ npm i webpack-dev-server -D
```

and configure it as follows.

##### webpack.config.js
```js

module.exports = {
  /* ... */
  devServer: {
    host: '0.0.0.0',
    port: '9000',
    stats: 'minimal',
    historyApiFallback: true,
  }
}
```

9. Set up the [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/);

If you use `MiniCssExtractPlugin`, add the following options to its loader.

##### webpack.config.js
```js

/* ... */

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            }
          },
          /* ... */
        ]
      },
    ]
  },
}

```

Add the `hot` option to the `devServer` options list.

##### webpack.config.js
```js

module.exports = {
  /* ... */
  devServer: {
    /* ... */
    hot: isDev,
  }
}
```

11. Set up the optimization.

Create the `optimization` object and add [chunks splitting](https://webpack.js.org/configuration/optimization/).

##### webpack.config.js
```js
const optimization = {
  splitChunks: {
    chunks: 'all'
  },
}

module.exports = {
  /* ... */
  optimization,
}
```

To minify JavaScript code, install [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)

```shell script
$ npm i terser-webpack-plugin -D
```

Create a `minimizer` property in your `optimization` object and add the `TerserWebpackPlugin` there.

##### webpack.config.js
```js
const TerserWebpackPlugin  = require('terser-webpack-plugin')

const optimization = {
  /* ... */
  minimizer: [
    new TerserWebpackPlugin(),
  ]
}

```

For CSS optimization, install [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin):

```shell script
$ npm i optimize-css-assets-webpack-plugin -D
```

And add it to `minimazer` array in your `optimization` object.

##### webpack.config.js
```js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const optimization = {
  /* ... */
  minimizer: [
    /* ... */
    new OptimizeCssAssetsPlugin(),
  ]
}

```

Add a `minify` property in the `HtmlWebpackPlugin` options list.

##### webpack.config.js
```js

const plugins = [
  new HtmlWebpackPlugin({
    /* ... */
    minify: {
      collapseWhitespace: isProd
    },
  })
  /* ... */
]

```
