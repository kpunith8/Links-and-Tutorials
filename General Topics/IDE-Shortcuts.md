# VS Code - Windows

## Searching

- `Ctrl + Shift + P` - Command Pallete, Search for specific help

- `Ctrl + T` - To search for symbols, methods and keywords in file in context

- `Ctrl + P` - Quickly open files to see recently opened files and to search for
  content, type search string followed by `#`

## Editing

- `Ctrl + I` - Select lines from current cursor downwards

- `Alt + Up/Down Arrow` - Move the selected lines using `Ctrl+I` option or manually select the lines using mouse.

- `Alt + click` - To select multiple lines for editing, press `esc` to come out of editing

- `Shift + Alt + F` - To format the document in the context

## Eclipse shortcuts

- `Alt + Up/down` - To move the selected code up and down.

-	`Alt + Shift + Up/Down` - To select the enclosing selection from up or down.

- `Alt + Shift + A` - for block selection and editing multiple lines

- Hold `Shift` while hovering the variable/declaration to see its initial declaration.

- `Ctrl + Shift + Y` for Lowercase, `Ctrl + Shift + X` for Uppercase.

## IntelliJ Shortcuts - Mac

### Sigle Keys
- `F2` - Jump to next error suggestion 

- `Tap Ctrl twice` - To run anything

- `Tap Shift twice` - Search anything

### Cmd + other keys

- `Cmd + 1` - Open the Project window / toggle

- `Cmd + E` - Open the recently opened files

- `Cmd + B` - To go to the file declaration

- `Cmd + N` - To show the option `Generate` based on file type

### Option + other keys

- `Option + Enter` - Quick Fix

- `Option + Enter` - To not to show the hint on parameter names 
  - Turn off Inlay Hints in `Preferences -> Editor -> Inlay Hints`

- `Option + F7` - To find the all usages if an interface or concrete class

- `Option + Cmd + B` - To go to the implementation of the code

- `Option + Cmd + L` - To format the code

- `Option + Cmd + /` - To add a block comment

- `Option + Up key + down key` - Extend/decrease the selection

### Ctrl + other keys

- `Ctrl + T` - Shows the shortcuts availbale on selection to refactor

### Shift + other keys

- `Shift + Ctrl + R` - To run the code

- `Shift + Cmd + A` - To find all the shortcuts

- `Shitf + Cmd + F` - Find in files

- `Shitft + Cmd + Enter` - Complete the current statement

### Other 

- Use inspections to fix or find errors, for ex, migrating from JUnit4 to JUnit5 inspection can be done under
  `Inspections -> JUnit -> Migrate from JUnit4 to JUnit5`

# Disable errors on optional chaining in VS Code

Settings -> set, javascript.validate.enable": false

### VS code - Mac

- `Ctrl + Tab` - Rotate the recently opened file

- `Cmd + Shift + T` - To open recently closed file

- `Cmd + Shift + F` - Search for highlighted string in the selected path

- `Cmd + Shift + L` - add cursors to all occurrences of the current selection, click/select the text and use shortcut to select all the text starting with that text in the whole file

- `Cmd + P` - Recently opened files

- `Cmd + P` then `@` - Symbols used in the file or `@:` group the symbols

- `Cmd + P` then `:` - Type the line number in the code to go to that line

- `Cmd + D` - Select entries starting from the word under the cursor

- `Cmd + K + M` - Tell editor to treat document in the selected format

- `Cmd + Shift + .` - Fast `Navigation` within the file

- `Cmd + Shift + \` - Goto matching bracket

- `Option + Click` - select and edit multiple lines in source

- `Option + Up/Down Arrow` - Move the selected lines up/down

- `Shift + Option + Up/Down Arrow` - Copy the line up/down

- `Shift + Tab` - un-tab the tabs

- `Shift + Option` - select blocks of text while you drag your mouse.

- `Shift + Option + A` - Multiline commenting

---

## VS code doesn't locate git in M1

Update the xcode if you have installed the updates or for the first time 
```
$ xcode-select --install
```

Get the location of the location where git installed
```
$ where git
```

Update the `git.path` in VSCode preferences for eg, `/usr/bin/git` and restart

## VS Code plugins

- `quokka.js` - Same line evalution
- `auto import`
- `Better haml`
- `Bracket pair colorizer 2`
- `Editor config`
- `Git lens`
- `JavaScript and TypeScript Nightly`
- `Jenkinsfile support`
- `Live Server`
- `Prettier`
- `npm`
- `npm intellisense`
- `dash` - Documentation - `ctrl + h`, `ctrl + alt + h` - for see the documentation

- `REST Client` - to make rest calls from VS code
  - Create `requests.rest` - file in the route folder
  - Put `###` to send separate request in the same page

  ```
  GET http://localhost:3000/posts HTTP/1.1

  ###

  POST http://localhost:3000/posts
  content-type: application/json

  {
    "name": "Punith",
    "email": "kpunith8@gmail.com"
  }

  ###

  GET http://localhost:3000/posts?page=2&pageSize=10
  ```
