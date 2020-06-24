## GatsBy

- Install the `gatsby-cli` globally
  ```
  $ npm i -g gatsby-cli
  ```

- Create a new project
  ```
  $ gatsby new first-app
  ```

- Run the app in develop mode, runs in port, `8000`
  ```
  $ gatsby develop
  ```

### Build for production

- Build and serve the production ready app, runs locally in port, `9000`
```
$ gatsby build

// Serve the production build locally
$ gatsby serve
```

### Build with starters

- Use gatsby starters to build the apps on top prebuilt templates
  ```
  $ gatsby new [SITE_DIRECTORY_NAME] [URL_OF_STARTER_GITHUB_REPO]
  ```

### Routing

- File `about.js` added in the `src/pages/` folder will become about route which
  can be accessed as `/about`

### Linking between pages

- Linking between components, create `contact.js` under `src/pages/` folder so that
  gatsby links it automatically,
  ```JavaScript
  import { Link } from "gatsby"

  const Home = () => (  
    <Link to="/contact/">Contact</Link>
  )
  ```

## Deploying

- Use `surge` - static website hosting or `Gatsby Cloud` for deployments


## Styling

### Using global style

- Create `global.css` under a folder `src/styles`, `styles` folder can be named anything,
  but should be under `src`

- Create `gatsby-browser.js` in the root folder, where `package.json` present.
  `gatsby-browser.js` is one of a handful of special files that `Gatsby looks for`
  and uses (if they exist). Here, the `naming of the file is important`.
  And import the css file added,
  ```JavaScript
  import "./src/styles/global.css"
  ```

- The best way to add `global styles` is with a `shared layout component`.
  css can be added to the component itself, and style file should in the same folder
  for eg: `layout.js` and `layout.css` can reside in `src/components/`

- `Limitations`: The biggest problem with global CSS files is the risk of `name conflicts`
  and side effects like `unintended inheritance`.

### CSS Modules - Recommended Approach

- A CSS Module is a CSS file in which `all class names` and `animation names` are `scoped locally` by default.
  ```JavaScript
  import React from "react"
  import containerStyles from "./container.module.css"

  export default function Container({ children }) {
    return <div className={containerStyles.container}>{children}</div>
  }
  ```

  ```css
  .container {
    margin: 3rem auto;
    max-width: 600px;
  }
  ```

### Using styled components

- Install gatsby plugin and babel plugin for the same
  ```
  $ npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components
  ```

- Add the plugin to `plugins array` in `gatsby-config.js`
