# webpack-react-boilerplate

# Short HOW-TO
1.  Initialize a project using [npm](https://docs.npmjs.com/cli/init/) or [yarn](https://classic.yarnpkg.com/ru/docs/cli/init/);
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
