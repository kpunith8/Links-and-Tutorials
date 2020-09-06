# Next.js

- React framework does server side rendering OOTB

- `Pages` are associated with a `route` based on their `file name`.

## Assets, Metadata and CSS

- Next.js can serve static files, like images, under the `top-level public directory.`

### Metadata

- Metadata like `title` of the page can be added using, `<Head>` component is used instead of the lowercase <head>.
  <Head> is a React Component that is built into Next.js. It allows you to modify the <head> of a page.

- import the `Head` component from the `next/head` module.
  ```js
  <Head>
    <title>Next </title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  ```

- To customize the `<html>`, for example to add the `lang` attribute, can be done by creating a `pages/_document.js`

### CSS

- Supports `CSS Modules` and `Sass` OOTB

- Css can be added as shown below, using a library called `styled-jsx`. It’s a `CSS-in-JS`
  library — it lets you write `CSS within a React component`, and the `CSS styles will be scoped`
  ```js
  <style jsx>{`
    .container {
      min-height: 100vh;
      padding: 0 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `}</style>
  // To apply global style
  <style jsx global>{`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
    }

    * {
      box-sizing: border-box;
    }
  `}</style>
  ```

- Next.js has built-in support for `styled-jsx`, but we can also use `styled-components` or `emotion`

- `.css` or `.scss` files can also be imported and `tailwind css` can also be used

### Global styles

- `CSS Modules` are useful for component-level styles

- To load `global CSS files`, create a file called `_app.js` under `pages` and add the following content:
  ```js
  export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }
  ```

- You can add global CSS files by importing them from `pages/_app.js`.
  You cannot import global CSS anywhere else.

- Create `styles` folder in the root and add `global.css` and import the `global.css` in
  `pages/_app.js`

## Customizing PostCSS Config and Adding Tailwind CSS

- Out of the box, with no configuration, Next.js compiles CSS using `PostCSS`.

- To customize PostCSS config, you can create a top-level file `postcss.config.js`.
  This is useful if you’re using libraries like Tailwind CSS.

- Here are the steps to add `Tailwind CSS`. Use `postcss-preset-env` and `postcss-flexbugs-fixes` to match `Next.js’s default behavior`.
  First, install the packages:
  ```
  $ npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes
  ```

- Then write the following in  `postcss.config.js`
  ```js
  module.exports = {
    plugins: [
      'tailwindcss',
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: {
            flexbox: 'no-2009'
          },
          stage: 3,
          features: {
            'custom-properties': false
          }
        }
      ]
    ]
  }
  ```

- It is also recommended to remove `unused CSS` by specifying the `purge` option on `tailwind.config.js`
  ```js
  // tailwind.config.js
  module.exports = {
    purge: [
      // Use *.tsx if using TypeScript
      './pages/**/*.js',
      './components/**/*.js'
    ]
  }
  ```

### Using Sass

- Out of the box, Next.js allows you to import `sass` using both the `.scss and .sass` extensions.
  You can use component-level Sass via CSS Modules and the `.module.scss or .module.sass` extension.

- Before you can use Next.js' built-in Sass support, install sass

### Use classnames library to toggle class names

- Based on type passed classname of the div changes the color
  ```js
  import styles from './alert.module.css'
  import cn from 'classnames'

  export default function Alert({ children, type }) {
    return (
      <div
        className={cn({
          [styles.success]: type === 'success',
          [styles.error]: type === 'error'
        })}
      >
        {children}
      </div>
    )
  }
  ```

- CSS code
  ```css
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  ```

## Pre-rendering and Data fetching

- By default, Next.js `pre-renders every page`. This means that Next.js generates `HTML`
  for each page `in advance`, instead of having it all done by client-side JavaScript.
  Pre-rendering can result in better performance and `SEO`.

- Next.js has `two forms` of pre-rendering

  - `Static Generation` is the pre-rendering method that generates the HTML at `build time`.
    The pre-rendered HTML is then reused on each request. (Recommended)

  - `Server-side Rendering` is the pre-rendering method that generates the HTML `on each request`.

### Static Generation  with data using getStaticProps

- `export` an `async` function called `getStaticProps` from the component, which runs at build time
  in production, Inside the function, you can `fetch` external data and send it as props to the page.
  ```js
  export default function Home(props) { ... }

  export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const data = ...

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: ...
    }
  }
  ```

## Dynamic Routes

- Create a page called `[id].js` under `pages/posts`. Pages that begin with 
  `[ and end with ]` are dynamic routes in Next.js.
