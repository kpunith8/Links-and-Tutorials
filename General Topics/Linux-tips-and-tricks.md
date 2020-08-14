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
