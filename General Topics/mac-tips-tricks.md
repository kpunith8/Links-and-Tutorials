### Install fonts

- Install the Fira Code

```
$ brew tap caskroom/fonts

$ brew cask install font-fira-code
```

## Copy the result to clipboard

```
$ ls -al | pbcopy
```

## Mac terminal

- `Cmd + K` - To clear the command line content permanently

## Mac General Shortcuts

- `Ctrl + Cmd + Q` - Lock the system

- `Ctrl + Cmd + Space` - Emoji Icons

- `Cmd + C` - Copy

- `Option + Cmd + V` - Cut/Paste

- `Shift + Cmd + .` - Show or hide hidden files starting with `.`

- `Shift + Cmd + F` - Toggle Full screen

### List the running services in brew

```
$ brew services list
```

- Find the services running under,
  ```
  $Library/LaunchAgents
  ```

- `Kafka` - config reside in, `/usr/local/Cellar/kafka/2.5.0/libexec/config`

## Using zsh

- Change the default shell to `zsh`, execute this in
  ```
  $ chsh -s /bin/zsh
  ```

- `zsh` auto suggestions, https://github.com/zsh-users/zsh-autosuggestions

- Remove the computer name in the shell prompt, add this line to `~/.zshrc`
  ```
  export DEFAULT_USER="$(whoami)"
  ```

## Symbols Shortcuts

- `Opt + [` for `“`

- `Shift + [` for `”`

- `Opt + ]` for apostrophe


## Find the port running and kill it

```
$ sudo lsof -i :3000

$ sof -i tcp:3000
```

- Check the status
```
$ ps ax | grep <PID>
```

- Kill it if it is running
  ```
  $ kill -9 <PID>
  $ kill -15 <PID> // Safe killing
  $ kill -QUIT <PID> // Completely kill it
  ```

- Get the parent ID of the service created it
  ```
  $ ps -o ppid=<new pid>
  ```

## Convert markdown files to pdf with, pandoc and have pdflatex

- Install `pandoc` and `pdflatex` before running the command
  ```
  $ pandoc -f markdown -t pdf -o converted-markdown.pdf sample-markdown.md --pdf-engine=/Library/TeX/textbin/pdflatex
  ```

  - here, flags `-f` means `from`, `-t` means `to`, `-o` filename of the pdf output file and the engine name


## iBoysSoft NTFS to mac to format Pendrive to NTFS and resolve read only error


## Check whether softwares are ready for Apple Silicon

https://isapplesiliconready.com/


## xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools - VSCode doesn't recognize git


Run the following command in the commandline to fix it
```
$ xcode-select --install
```

## Updates to a tool from the commandline default macOS command

```
$ softwareupdate --install-rosetta
```