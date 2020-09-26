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
