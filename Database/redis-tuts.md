- In memory database, key-value pair based

## Install redis on macOS

```
$ brew update

$ brew install redis
```

- Start redis now and restart at login
```
$ brew services start redis
```

- List the started services
```
$ brew services list
```

- Or, if you don't want/need a background service you can just run:
```
$ redis-server /usr/local/etc/redis.conf
```

- Test if Redis server is running.
```
$ redis-cli ping
```

If it replies “PONG”, then it’s good to go!

- Location of Redis configuration file.
```
/usr/local/etc/redis.conf
```

- Uninstall Redis and its files.
```
$ brew uninstall redis

$ rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

- Stop the redis service
```
$ brew services stop redis
```

## redis-cli

- Clear everything

```
$ redis-cli # will take to command line

> FLUSHALL
```

- Get the stored data by key

```
> get 'key'
```
