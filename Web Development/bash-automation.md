## Automation for web development using bash 

[Course link](https://egghead.io/courses/advanced-bash-automation-for-web-developers)
[Source code](https://github.com/ccnokes/advanced-bash-automation-for-web-developers)

### Shortcuts 

- `Ctrl + a` - Go to the beginning of the command typed in command line
- `Ctrl + e` - Go to the end
- `Ctrl + w` - Delete the word before the cursor
- `Ctrl + l` - Clear the command line

### Aliases 

- Update the bash file `.bash_profile`
```bash
alias git_sync="git pull -r && git push"

alias ll="ls -alG"
```

- After updating the `.bash_profile` file, run the following command to reload the aliases
```bash
$ source ~/.bash_profile
```

- Get the content of an alias
```bash
$ type git_sync
```

### Add executable files to $PATH

- Add the bash script to $PATH to make it available to the command line, edit the `.bash_profile` file
```bash
export PATH="$PATH:~/my-scripts"
```

- Create a folder `my-scripts` and `hello` file without any extension to run `hello` as a command
```bash
$ mkdir -p my-scripts

$ echo 'echo hello' > my-scripts/hello

# Give executable permissions to the file
$ chmod +x my-scripts/hello

$ source ~/.bash_profile

# Execute the command hello
$ hello
```

- It can also be done by linking(symbolic) the executable file to the `/usr/local/bin` folder
```bash
$ ln -s ~/my-scripts/hello /usr/local/bin
```

### Create multiple files using brace expansion

```bash
$ touch index.js{,backup}
```

### History expansions

```bash
# Execute the last command in the history
$ !!

# Pass sudo command to the last command in the history
$ sudo !!

# Pass the last argument of the previous command to the current command
$ echo test.sh

$ chmod +x !$
```

### Set default arguments with parameter expansions

```bash
# Use the string 'default' if USER name doesn't exist
$ echo ${USER:-'default'}
```

- Count the number of files in a directory, pass default param if user doesn't pass any argument
```bash
# count-files.sh
dir=${1:-$PWD}
find "$dir" -type f -maxdepth 1 | wc -l
```

### Use jq and grep to find unused dependencies in a NodeJS project

```bash
$ jq -r '.dependencies | keys | .[]' package.json
```

- Check unused deps shell script
```bash
#!/bin/bash

# check-unused-deps.sh
for dep in $(jq -r '.dependencies | keys | .[]' package.json); do
  if ! grep "require\(.*$dep.*\)" -Rq --exclude-dir="node_modules" .; then
    echo "$dep is not used"
  fi
done
```

### Redirect both stdout and stderr to the same file

```bash
$ ls not-exist > file-list.txt 2>&1
```

### post-merge hook to install the dependencies

- Create `hooks` and `logs` folders in the project root then link `post-merge` script to the `.git/hooks/` folder
```bash
#!/bin/bash

# hooks/post-merge, file extension .sh is not mandatory
exec >> logs/hooks-out.log 2>&1

if git diff-tree --no-commit-id --name-only ORIG_HEAD HEAD | grep -q 'package.json'; then
  echo "$(date): Installing dependencies because package.json changed"
  npm install > /dev/null
else
  echo "$(date): Skipping installation of dependencies because package.json didn't change"
fi
```
- Give executable permissions to the script before linking it to the `.git/hooks` folder
```bash
$ chmod +x hooks/post-merge
$ ln -fv hooks/post-merge .git/hooks/ 
```

- `post-merge` script will run after the merge is done when pulled from the remote repository.

### use case to switch between different input (similar to switch case in C)

- Script to extract the compressed files based on the file extension
```bash
#!/bin/bash

# file-extractor.sh
case "$1" in
  *.tar|*.tgz) tar -xzvf "$1" ;;
  *.gz) gunzip -k "$1" ;;
  *.tar.bz2) tar -xjvf "$1" ;;
  *.zip) unzip -v "$1" ;;
  *.rar) unrar e "$1" ;;
  *) 
    echo "Unknown format $1"
    exit 1
  ;;
esac
```

### getopts - to handle options passed to a script

```bash
#!/bin/bash

# getopts-example.sh
while getopts ":a:b:" opt; do
  case $opt in
    a)
      echo "Option a was triggered, Parameter value: $OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG"
      ;;
  esac
done

# Process all arguments except the ones that are used by getopts
shift $(( OPTIND - 1 ))

for arg in "$@"; do
  echo "Argument: $arg"
done
```

- Usage
```bash
$ ./getopts-example.sh -a test -b 123 abc cde
```

### Script to open a PR to github using getopts

```bash
#!/bin/bash

# open-pr.sh
current_branch=$(git rev-parse --abbrev-ref HEAD)
user_name=""
title=""
password=""

usage() {
  echo "open-pr [-u <user-name>] [-p <password>] [-t <title>] <body-of-the-pr>"
}

while getopts ':u:p:t:h' opt do;
  case $opt in
    u)
      user_name=$OPTARG
      ;;
    p)
      password=$OPTARG
      ;;
    t)
      title=$OPTARG
      ;;
    h)
      usage
      exit 0
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      usage
      exit 1
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      usage
      exit 1
      ;;
  esac
done

# Process all arguments except the ones that are used by getopts
shift $(( OPTIND - 1 ))

if [[ current_branch == "master" ]]; then
  echo "You can't open a PR from master branch, create a new branch and then run this script" >&2
  exit 1
fi

check_is_set() {
  if [[ -z "$2" ]]; then
    echo "ERROR: $1 must be set" >&2
    usage >&2
    exit 1
  fi
}

check_is_set "user_name" "$user_name"
check_is_set "title" "$title"
check_is_set "password" "$password"

data=$(cat <<-END
{
  "title": "$title",
  "base": "master",
  "head": "$current_branch",
  "body": "$@"
}
END
)

status_code = curl -s --user "$user_name:$password" -X POST https://api.github.com/repos/<username>/<repo-name>/pulls  -d "$data" -w %{http_code} -o /dev/null

if [[ $status_code == "201" ]]; then
  echo "Successfully opened a PR"
else
  echo "Failed to open a PR, $status_code" >&2
fi
```

- Usage
```bash
$ ./open-pr.sh -u <user-name> -p <password> -t <title> <body-of-the-pr>
```