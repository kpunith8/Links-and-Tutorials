## Node examples and utility methods

Helper method to get the root directory where the node's main module runs
```js
const path = require('path');

const rootDir = path.dirname(process.mainModule.filename);

// Pass it to path.join() to construct a absolute path
// instead of __dirname use rootDir 
path.join(rootDir, 'views', '404.html')
```
