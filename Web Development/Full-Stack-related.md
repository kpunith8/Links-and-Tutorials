## WebRTC 

## Web Workers

## SSL Certificate

- SSL = `Secure Sockets Layer` - a security `protocol` that creates an `encrypted link` between a `web server` and a `web browser`.

- It is a `digital certificate` that `authenticates a website's identity` and enables an `encrypted connection`.

- 

## HTTP/2 

- The primary goals for HTTP/2 are to `reduce latency` by enabling `full request and response multiplexing`, minimize protocol overhead via efficient `compression of HTTP header fields`, and add support for `request prioritization` and `server push`. 

- All the core concepts, such as HTTP methods, status codes, URIs, and header fields, remain in place.

-  HTTP/2 `modifies how the data is formatted (framed) and transported` between the client and server

## CDN - Content Delivery Network

- A CDN is a` network of servers linked together` with the goal of `delivering content as quickly`, `cheaply`, `reliably`, and `securely` as possible.

-  In order to improve speed and connectivity, a CDN will place servers at the exchange points between different networks.

- The `globally distributed nature` of a CDN means `reduce distance between users` and `website resources`.

- Hardware and software optimizations such as efficient `load balancing` and `solid-state hard drives` can help data reach the user faster.

- CDNs can reduce the amount of data that’s transferred by reducing file sizes using tactics such as `minification` and `file compression`. Smaller file sizes mean quicker load times.

## Ngnix 

- It is an open-source `web server` that, since its initial success as a web server, is now also used as a `reverse proxy`, `HTTP cache`, and `load balancer`.

- Nginx is built to offer `low memory usage` and `high concurrency`. Rather than creating new processes for each web request, Nginx uses an `asynchronous`, `event-driven approach` where requests are handled in a `single thread`.

- With Nginx, `one master process` can control `multiple worker processes`. The master maintains the worker processes, while the workers do the actual processing. Because Nginx is asynchronous, each request can be executed by the worker `concurrently without blocking other requests`.

- Contains `sites_available` and `sites_enabled` folders 

### Configuration

Update `etc/hosts` file with IP address and the domain name

```
# /etc/hosts
0.0.0.0 sample.com
```

- Give permissions to all the files inside `var/www/demo` folder
```
$ sudo chmod -R 777 /var/www/demo
```

- Copy all the files to server using `scp` - Secure Copy
```
$ scp -r * 0.0.0.0:/var/www/demo 
```

- Go to `/etc/ngnix` folder and locate `sites_available` and `sites_enabled` folders 

- Create a configuration file in `sites_available` folder and and create symbolic link to it in `sites_enabled` folder
```
# sites_available/demo
server {
  listen 80 default_server;
  listen [::] default_server;
  root /var/www/demo;
  index index.html;
  server_name demo;
  location / {
      try_files $uri $uri/ =404;
  }
}
```

- Create a symbolic link to the configuration file in `sites_enabled` folder
```
$ sudo ln -s etc/ngnix/sites_available/demo etc/ngnix/sites_enabled/demo
```

- Restart the ngnix server
```
$ sudo systemctl restart nginx
```

## Reverse Proxy

- Reverse proxy sits in the server and can be used as load balancer, cache, or reverse proxy.

## Load balancing

- Distributes the load between processes and/or hosts
- Failover: If one server fails, the load is redistributed to the other servers
- Zero downtime redeployment

## Ngnix Configuration for load balancing

- Create a configuration file in `/etc/ngnix/conf.d/domain.com.conf`
```shell
# Log Format
log_format  upstreamlog  '$server_name to: $upstream_addr [$request] '
  'upstream_response_time $upstream_response_time '
  'msec $msec request_time $request_time '

# Load balancers
upstream domain {
  ip_hash; # Always routes to a specific server for a particular client
  server localhost:8000;
  server localhost:8001;
  server localhost:8002;
}

server {
  listen 80;
  server_name domain.com;

  access_log /var/log/nginx/domain.com.access.log upstreamlog;

  location /static {
    root /var/www/demo;
  }

  location / {
    proxy_pass http://domain; # Name of the upstream created above
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forward-Host $server_name;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

- Check whether we have any typo errors in the script, run
```
$ sude ngnix -t
```

- Reload the ngnix
```
$ sudo systemctl reload nginx
```

- Watch for log as we make requests
```
$ sudo tail -f /var/log/nginx/domain.com.access.log
```

### Enable session persistence - cookie

```
upstream domain {
  server localhost:8000;
  server localhost:8001;
  sticky cookie srv_id expires=1h domain=.example.com path=/;
}
```


### Enable session persistence - Route

```
upstream domain {
  server localhost:8000;
  server localhost:8001;
  sticky route $route_cookie $route_uri;
}
```

### Max connections with a queue 

Enable max connections of 400 with a queue of 100, if the number of requests are more than 400, the requests will be queued.
```
upstream domain {
  server localhost:8000 max_conns=400;
  server localhost:8001;
  queue 100 timeout=70; # Timeout server waits before sending a 503 error to the client
}
```
