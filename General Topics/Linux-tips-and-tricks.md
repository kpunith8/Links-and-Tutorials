## grep

- Print 20 lines from where the pattern matches

```
$ cat package.json | grep -A 20 "scripts"
```

## List all the files (hidden) with attributes

- all files attributes including hidden files and folders
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
