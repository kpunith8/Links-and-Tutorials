## Ngnix - Code tested on Mac M1

- It is a high performance web server to handle http requests. 
- It can also acts as a `load balancer`.
- It sits betweeen servers as a `proxy server` and distributes the requests to different servers based on the load. Load distribution happens based on a selected algorithm.
- Caching is a core feature of Nginx proxy.
- It provides security through encrypted communication, ngnix handles SSL/TLS encryption
and decryption and enforces https.
- It can also compress the response to reduce the bandwidth and improve load times, and
also it sends responses as chunks (video or audio streaming)

### Configuration 

- The main config file is typically named `ngnix.conf` and usually located in `/etc/ngnix` folder and we can use directives or blocks to define the configuration.

- Example of simple web server serving static files
```conf
server { # server = contexts
  listen 80;
  server_name example.com www.example.com;

  location / { # location = directive
    root /var/www/example.com;
    index index.html index.htm;
  }
}
```

### nodeJS server serving static files

- [Example source code](https://gitlab.com/twn-youtube/nginx-crash-course/)

- Install `express` and `path` npm packages
```js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const appName = process.env.APP_NAME

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log(`Request served by ${appName}`);
});
app.listen(port, () => {
    console.log(`${appName} is listening on port ${port}`);
});
```
- Create an `images` folder and put some images in it.

- A web page with images loading images from nodeJS server
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beautiful Landing Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            color: #333;
        }
        header {
            background: url('images/background.png') no-repeat center center/cover;
            color: #fff;
            padding: 100px 0;
            height: 150px;
            text-align: center;
        }
        header h1 {
            font-size: 3em;
            margin: 0;
        }
        header p {
            font-size: 1.2em;
        }
        nav {
            background: #333;
            color: #fff;
            display: flex;
            justify-content: space-around;
            padding: 15px 0;
        }
        nav a {
            color: #fff;
            text-decoration: none;
            font-weight: bold;
        }
        .container {
            padding: 20px;
        }
        .grid {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        .card {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            flex: 1;
            min-width: 280px;
            max-width: 300px;
            padding: 15px;
        }
        .card img {
            border-radius: 8px;
            width: 100%;
            height: auto;
        }
        footer {
            background: #333;
            color: #fff;
            text-align: center;
            padding: 20px 0;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <header>
    </header>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">Best Courses</a>
    </nav>
    <div class="container">
        <h2>Courses</h2>
        <div class="grid">
            <div class="card">
                <img src="images/image-1.png?crop=entropy&fit=crop&w=400&h=200" alt="Service 1">
                <h3>Description-1</h3>
            </div>
            <div class="card">
                <img src="images/image-2.png?crop=entropy&fit=crop&w=400&h=200" alt="Service 2">
                 <h3>Description-2</h3>
            </div>
            <div class="card">
                <img src="images/image-3.png?crop=entropy&fit=crop&w=400&h=200" alt="Service 3">
                 <h3>Description-3</h3>
            </div>
        </div>
    </div>
    <footer>
        <p>&copy; All Rights Reserved.</p>
    </footer>
</body>

</html>
```

- Dockerize the server
```dockerfile
FROM node:20

WORKDIR /app

COPY server.js .
COPY index.html .
COPY images ./images
COPY package.json .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
```

- Build a docker image and start the container
```sh
$ docker build -t my-node-app:1.0 . # . here means current directory, reads Dockerfile from the current directory
$ docker run -d -p 3000:3000 my-node-app:1.0 # -d Run the container in the backgroud
```

- Run multiple docker containers using `docker-compose.yml`
```yaml
version: '3'
services:
  app1:
    build: .
    environment:
      - APP_NAME=App1
    ports:
      - "3001:3000"

  app2:
    build: .
    environment:
      - APP_NAME=App2
    ports:
      - "3002:3000"

  app3:
    build: .
    environment:
      - APP_NAME=App3
    ports:
      - "3003:3000"
```

- Start all the docker containers 
```sh
$ docker-compose up --build -d
```

### Configure ngnix proxy

- Install and configure the ngnix proxy
```sh
$ brew install ngnix
```

```conf
# Main context (this is the global configuration)
worker_processes 1; 
# It can be changed based on the number of processors where the server runs
# to process the requests parallely, pass `auto` to let ngnix decide based
# on the available cores

events {
    worker_connections 1024; # Default 512
}

http {
    include mime.types;

    # Upstream block to define the Node.js backend servers
    upstream nodejs_cluster {
        # Specify the algorithm for load balancing, by default ngnix uses round robin
        # Refer documentation for other algos, for eg, least connections, IP hash,
        # Weighted round robin, and weighted least connections.
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
        server 127.0.0.1:3003;
    }

    server {
        listen 443 ssl;  # Listen on port 443 for HTTPS
        server_name localhost;

        # SSL certificate settings
        ssl_certificate /Users/user/nginx-certs/nginx-selfsigned.crt;
        ssl_certificate_key /Users/user/nginx-certs/nginx-selfsigned.key;

        # Proxying requests to Node.js cluster
        location / {
            proxy_pass http://nodejs_cluster;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }

    # Optional server block for HTTP to HTTPS redirection
    server {
        listen 8080;  # Listen on port 80 for HTTP
        server_name localhost;

        # Redirect all HTTP traffic to HTTPS
        location / {
            return 301 https://$host$request_uri;
        }
    }
}
```

### Obtain a SSL/TLS certificate

- SSL certs enable cryption by using a `public key`.
- When user accesses a website via https, the server provides its SSL cert, which
contains a public key
- The client(browser) can use this key to establish a `secure, encrypted session`
with the server.

- Create a self-signed certificate
```sh
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
```

- Private key must be kept secret and is for the server, `ngnix-selfsigned.key`
and `ngnix-selfsigned.crt` is a public key.

- Restart the ngnix to apply cert changes.

### Commands reference

- Start nginx
```sh
$ nginx
```

- Check more about ngnix options, eg., --config-path
```sh
$ ngnix -V
```

- Get options
```sh
$ nginx -h
```

- Restart nginx
```sh
$ nginx -s reload
```

- Stop nginx
```sh
$ nginx -s stop
```

- Print logs
```sh
$ tail -f /usr/local/var/log/nginx/access.log
```

- Create folder for nginx certificates
```sh
$ mkdir ~/nginx-certs
$ cd ~/nginx-certs
```

### References:
- [Techworld with Nana](https://www.youtube.com/watch?v=q8OleYuqntY)