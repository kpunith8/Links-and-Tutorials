## grep

### Print 20 lines from where the pattern matches

```
$ cat package.json | grep -A 20 "scripts"
```

### List all the files in a folder recursively and get the count

```
$ ls -LR | grep '_spec.rb' -c
```

## List all the files (hidden) with attributes

```
$ ls -ltra
```

## Check the OS version installed

```
$ cat /etc/os-release
```

## Run a command without sudo

- For Ubuntu
```
$ sudo usermod -aG docker $USER
```

## Go back to the previous path
```
$ cd -
```
## find command

The find command can be used to find files or folders matching a particular search pattern.
It searches recursively.

Find all the files under the current tree that have the .js extension and print the relative path of each file that matches
```
$ find . -name '*.js'
```
It's important to use `quotes` around special characters like * to avoid the shell interpreting them.

Find directories under the current tree matching the name `src`
```
$ find . -type d -name src
```

Use `-type f` flag to search only files, or `-type l` flag to only search symbolic links.
`-name` is `case sensitive`. use `-iname` to perform a `case-insensitive` search.

Search under multiple root trees
```
$ find folder1 folder2 -name filename.txt
```

Find directories under the current tree matching the name "node_modules" or 'public'
```
find . -type d -name node_modules -or -name public
```

You can also exclude a path using `-not -path`
```
find . -type d -name '*.md' -not -path 'node_modules/*'
```

You can search files that have more than 100 characters (bytes) in them
```
find . -type f -size +100c
```

Search files `bigger than 100KB` but `smaller than 1MB`
```
find . -type f -size +100k -size -1M
```

Search files edited `more than 3 days ago`
```
find . -type f -mtime +3
```

Search files edited in the `last 24 hours`
```
$ find . -type f -mtime -1
```

You can delete all the files matching a search by adding the `-delete` option.
This deletes all the files edited in the last 24 hours
```
$ find . -type f -mtime -1 -delete
```

You can execute a command on each result of the search.
Run cat to print the file content:
```
$ find . -type f -exec cat {} \;
```

Notice the terminating \;. {} is filled with the file name at execution time.
