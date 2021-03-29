- In memory database, key-value pair

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

- Enter the CLI-mode
```
$ redis-cli
```

### Strings

-  Clear everything (all key-value pairs)
```
> flushall
```

- Set a key with an expire of 4 seconds
```
> set name "Punith K" ex 4
```

- Set the expire time(s) for a key
```
> expire name 10
```

- Check the TTL (time to live) of the key, displays the time left to expire
```
> ttl name
```

- Set an expire with setex 
```
> setex phone 10 123456789
```

- Get the stored data by key
```
> get name
```

- Set and get multiple values 
```
> mset name "Punith K" age 20
> mget name age
```

- Increment and decrement a value 
```
> incr age 
> decr age 
```

- Increment and decrement by required quantity
```
> incrby age 4
> decrby age 4
```

- Increment a float value
```
> incrbyfloat age 1.2
```

### Lists

- List all the keys
```
> keys *
```

- Create a list and add some data, LPUSH - pushes the value to the left, USA pushed to the left of India
```
> lpush country India USA
```

- Read the data from the list, -1 to get all the entries from the list
```
> lrange country 0 -1
```

- Push values to the right of the list, Australia is pushed after India
```
> rpush country Australia
```

- Get the length of the list
```
> llen country
```

- Remove the value from the left or right of the list 
```
> lpop country
> rpop country
```

- Change the values in the list, USA will be replaced by France, 0 based index
```
> lset country 0 France
```

- Insert before or after any key using `linsert`
```
> linsert country before India UK
```

- Get the item at any index
```
> lindex country 1
```

- Check if list exists and push the data, if list doesn't exist, returns 0 indicating nothing inserted
```
> lpushx country "Germany"
```

- Sort the data in the list
```
> sort country alpha
> sort country desc alpha
> sort country limit 0 2 desc alpha
```

- Block deleting an item 
```
> blpop conutry 1
```

### Sets - Stores only the unique values

- Add items to the set 
```
> sadd tech Java
```

- List all the members of a list 
```
> smembers tech
```

- Get the total count in a set
```
> scard tech
```

- Check whether member exists in a set
```
> sismember tech Java
```

- Find the difference between the sets
```
> sdiff tech frontend
```

- Strore the result of set diff into a new set
```
> sdiffstore diffTech tech frontend
```

- Use `sinter` for intersection between the lists, and use `sinterstore` to store the result of
  intersection into a new list

- Similarly, use `sunion` to combine two/more lists into one and `sunionstore` to store the result 
  of union into a new list.

### Sorted Set 

- Provide the score and value, based on the score it sorts the list 
```
> zadd users 1 "Punith K" 3 "Nick" 2 "Rama"
```

- Display the items in the sorted list, use `zrevrange` to display list in reverse,
  use `revrangebyscore` to display the list in reverse based on the score
```
> zrange users 0 -1 withscores
> zrevrangebyscore users 6 0 withscores
```

- Use `zcard` to get the total count of a sorted set

- Use `zcount` to get the count, from -ve infinity to +ve infinity
```
> zcount users -inf +inf
```

- Get the score for a value
```
> zscore users "Punith K"
```

- Increment the score of a member
```
> zincrby users 2 "Nick"
```

- Remove the key from the list
```
> zrem users Rama
```

- Remove the members range by score
```
> zremrangebyscore users 5 6
```

- Remove the members range by rank
```
> zremrangebyrank users 0 2
```

### Hyperloglog

- Probabilistic DS used to count unique values, can be ip address, search terms, location etc

- Add the data in the hyperlog
```
> pfadd hlog a
```

- Count the items using 
```
> pfcount hlog hlog1
``` 

- Merge the 2 hyperloglog 
```
> pfmerge mergedHLog hlog hlog1
```

### Hashes

- Map of string keys and string values

- Add a value 
```
> hset userHash name "Punith K"
> hset userHash email "kpunith8@gmail.com"
```

- Set multiple values to the hash
```
> hmset userHash country India State Karnataka
```

- Get the keys and values from the hash
```
> hkeys userHash
> hvals userHash
```

- `hgetall` to get both keys and values from the hash

- Get the multiple values
```
> hmget userHash name country email
```

- To check whether key or value exisits
```
> hexists userHash name
```

- Check the length of the hash
```
> hlen userHash
```

- Use `hincrby` to incrment the value of a key which is numeric, `hincrbyfloat` for float number 

- Delete the key  
```
> hdel userHash age 
```

- `hstrlen userHash name` - to get the length of any key

- Check if vlaue already exists for the key add/update otherwise
```
> hsetnx myhash name "Rama"
# It doesn't override the name key with a value, "Punith K" with Rama
```

### Transactions

