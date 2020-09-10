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

- `export` an `async` function called `getStaticProps()` from the component, which runs at build time
  in production, Inside the function, you can `fetch` external data and send it as props to the page.
  `export` `getStaticPaths()` from the component to get the path ids with `fallback` set to true
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

## getInitialProps to make Client Side Rendering

- getInitialProps() usage
  ```js
  export default function Page({people}) {
    return <pre>JSON.stringify(people, null, 2)</pre>
  }

  Page.getInitialProps = async ctx => {
    const res = await fetch("https://api.com/people")
    const people = await res.json();
    return {people}
  }
  ```

- Consider using `getStaticProps()` instead of `getInitialProps()` from Next 9.3

## getServerSideProps (Client side rendering)

- getServerSideProps() usage
  ```js
  export const getServerSideProps = async ctx => {
    const res = await fetch("https://api.com/people")
    // Can be used to get the data from DB directly
    const people = await res.json();
    return {props: {people}}
  }
  ```

- `Router.events` can be used to listen to different events happening inside the `Next.js Router` and we can add
  progress using `nprogress` using `custom App`, keep `_app.js` under `/pages`

## Environment variables

- Use `cross-env` or `dotenv` npm package

  ```json
  "scripts": {
    "build": "cross-env MY_VAR=hello MY_SECRET=1234 next build"
  }
  ```

- These env variables are not available at build time for next we need to update `next.config.js` as follows

- Refer `Runtime configuration` to get the configuration at run time  
  ```js
  // import dotenv here if you are consider using it
  // require('dotenv').config()
  // it needs .env file to be created in the root folder with variables declared and should not be committed to git or source control
  module.exports = {
    env: {
      // These env variables will only be available in build time
      MY_VAR: process.env.MY_VAR,
      API_END_POINT: `/api/people`
    },
    serverRuntimeConfig: {
      MY_SECRET: process.env.MY_SECRET
    },
    publicRuntimeConfig: {
      API_END_POINT: '/api/version/1'
    }
  }
  ```

- Use the runtime config by `import getConfig from 'next/config'`, which returns,
  `serverRuntimeConfig`, `publicRuntimeConfig` objects

## Incremental Static Regeneration and SSG

If the requested page is not built at the build time, it is better
to generate on the fly, in case of thousands of pages, generating all the pages
during the build time will have a slow building time which is not the
ideal thing to do, instead set `fallback: true` when returning data from
`getStaticPaths()` and set `revalidate` to any value (in seconds) to `revalidate`
the SSG after a certain delay, from `getStaticProps()`

Update the database and keep requesting the page, page revalidates after 3 seconds,
if we have any new data in the backend, it revalidates for the mentioned time
  ```js
  // inside posts/[id].js file for dynamic routes
  import { useRouter } from 'next/router';

  export default function PageDetail(data) {
    const {brand, model, price, imageUrl} = data
    // To details about fallback so that we can so loading indicators to users
    // while data is being fetched for incremental static generation
    const router = useRouter();

    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>{brand}</div>
        <div>{model}</div>
        <div>{price}</div>
        <div>{imageUrl}</div>
      </div>
    );
  }

  export const getStaticProps = async ctx => {
    const id = ctx.params.id;
    const db = await openDB();
    // Could be a fetch call to external API
    const data = await db.get('SELECT * from microphone where id = ?', + id)

    return {
      props: data,
      revalidate: 3, // in secs
    }
  }

  export const getStaticPaths = async () => {
    const db = await openDB();
    const microphones = await db.all('select * from microphone');
    const paths = microphones.map((a) => {
      return { params: { id: a.id.toString() } };
    });

    return {
      fallback: true, // to incremental static generation
      paths,
  };
  ```
