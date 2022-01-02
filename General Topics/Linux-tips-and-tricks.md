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
```bash
$ find . -type f -mtime -1 -delete
```

You can execute a command on each result of the search.
Run cat to print the file content:
```bash
$ find . -type f -exec cat {} \;
```

Notice the terminating \;. {} is filled with the file name at execution time.

## Bash - From Egghead.io course

### sed - String manupulation

- Find and replace string with `sed`
```bash
# -i is the flag to edit in place, param to -i flag is a backup file name to store the original file
# s for substitute, d for delete, and i for insert
$ sed -i '' 's/old/new/g' file.txt 

# Specifying the number in the sed command tells which line to replace
$ sed -i '' '1,3 s/old/new/g' file.txt 

# Specify regex instead of a line number, it is applied to first line, and use /dog/! to invert the match, 
$ sed -i '' '/dog/ s/old/new/g' file.txt 
```

- Find and delete lines with `sed`
```bash
# Delete all empty lines in a file
$ sed -i '' '/^$/ d' file.txt

# Delete the first line
$ sed -i '' '1 d' file.txt

# Delte the last line
$ sed -i '' '$ d' file.txt
```

- Insert text with `sed`
```bash
$ sed -i '' '1 i\// Copyright 2020' file.txt

# Insert text to all JS files in a directory in macOS
$ for f in $(ls *.js); do sed -i '' '1 i\// Copyright 2020' $f; done
```

### cut 

```bash
# cut by delimiter
$ cut -d ',' -f 1,2,3 file.txt

# cut by character
$ cut -c 1-3 file.txt
```

### awk - String extraction from columns

```bash
$ ps aux | awk '{print $1, $2, $3}'

# Print column 2 only having a value greater than 3
$ ps aux | awk '{$2 > 3 {print $2}}'

# Extract data from csv file
$ awk -F ',' '$2 == "Engineering" && $3 > 10 {print $1}' file.csv
```

