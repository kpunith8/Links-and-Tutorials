## TypeScript

`Superset` of JavaScript

It adds `Types`, supports next generation JS features (compiled down to older browsers),
`non-JS features` like `Generics` and `Interfaces`, meta programming features like `Decorators`,
offers richer `configuration` for flexibility

Install typescript globally using npm and initialize the TypeScript project with `tsc` as follows

`tsc --init` creates `.tsconfig.json` file, specifies the root files and the
compiler options required to compile the project

`tsc` TypeScript compiler

### Issues

`Cannot redeclare block-scoped variable` (VS Code) writing individual files,
to fix this, add `export {};` in the beginning of the file
