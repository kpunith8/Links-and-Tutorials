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

- `Option + Click` - select and edit multiple lines in source

- `Option + Up/Down Arrow` - Move the selected lines up/down

- `Shift + Option + Up/Down Arrow` - Copy the line up/down

- `Shift + Tab` - un-tab the tabs

- `Shift + Alt` - select blocks of text while you drag your mouse.

- `Cmd + D` - Select entries starting from the word under the cursor

- `Cmd + K + M` - Tell editor to treat document in the selected format

- `Cmd + Shift + .` - Fast `Navigation` within the file

- `Cmd + Shift + \` - Goto matching bracket

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
