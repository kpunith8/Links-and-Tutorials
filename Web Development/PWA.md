## Progressive Web Apps

- [Progressive Apps Store](https://progressiveapp.store/home)

- Add service workers - Runs all the time

- Add the following code and create `service-worker.js` file
  ```html
  <script>
    if('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker')
        .then(reg => console.log('Success', reg.scope))
        .catch(err => console.log('Error:', err))
      })
    }
  </script>
  ```

- `service-worker.js` file
  ```javascript
  const CACHE_NAME = "v1";
  //
  const urlsToCache = ["index.html", "offline.html"];

  const self = this;

  // Install the Service Worker
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Opened Cache");
        return cache.addAll(urlsToCache);
      })
    );
  });

  // Listen for requests
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then(() => {
        return fetch(event.request).catch(() => caches.match("offline.html"));
      })
    );
  });

  // Activate the SW
  self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        )
      )
    );
  });
  ```

- `manifest.json` file - contains info about app name, logos for different devices and so on
  ```json
  {
    "short_name": "Weather App",
    "name": "Weather PWA App",
    "icons": [
      {
        "src": "/images/logo.png",
        "sizes": "64x64 32x32 24x24 16x16",
        "type": "image/png"
      },
      {
        "src": "/images/logo.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "/images/logo.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
  ```


- Add reference to `manifest.json` in html page
  ```html
  <link rel="icon" type="image/png" href="./images/logo.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Weather App" />
  <link rel="apple-touch-icon" href="./images/logo.png" />
  <link rel="manifest" href="./manifest.json" />
  ```

- Open the `chrome-dev-tools` and go to `application` tab to see whether it has created the cache for the app.
  Other options can also be seen are, `Service Workers`

- Once cache created we need to clear to recreate again in `chrome-dev-tools`
  - Check the cache create under, `application -> Cache -> Cache storage`
