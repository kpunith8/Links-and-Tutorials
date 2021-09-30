## Webpack 5

- Install `webpack`, `webpack-cli`, and `webpack-dev-server` as devDependencies.

```
$ npm i -D webpack webpack-cli webpack-dev-server
```

- Create a file `src/index.js`, webpack looks for this file to start building the bundle.
  It can be configurable.

- Add few scripts to package.json.

```json
"scripts": {
  "serve": "webpack serve",
  "watch": "webpack --watch",
  "build": "webpack",
}
```

- Webpack build script can take options to build the bundle from specific configuration file,
  by default it looks for `webpack.config.js` file in the root directory.

- Pass `webpack.config.dev.js` to build the bundle for development and `webpack.config.prod.js` to build the bundle for production.

```
webpack --config webpack.config.dev.js
```

Example Project:

https://github.com/kpunith8/webpack-5-template

## Webpack

Bundler optimize the code, transforms files, add plugins called loaders to
optimize and do more, use latest features

Provide an entry point, it builds dependency graph, and bundles them together
and put it to bundle file (Single output file)

`Loaders` applied on per file level, css-loader, js-loader (babel-loader)

`Plugins` to apply transformation on the bundled file(ex: uglify)

eg: Compile next Gen Javascript features, handling JSX, CSS `autoprefixing` (to prefix
css for all the browsers), and support image imports, optimize the code

Create a npm project and add the dependencies

Refer `webpack-react-sample` https://github.com/kpunith8/webpack-react-boilerplate
