# YAML - YAML Ain’t markup language

## Rules for Creating YAML file

- YAML is `case sensitive`
- The files should have `.yaml` or `.yml` as the extension
- YAML does not allow the use of tabs while creating YAML files; spaces are allowed instead

## Rules

- `List members` are denoted by a leading hyphen `-`.
```yml
info:
  - name: 'Punith K'
    fName: 'Punith'
    lName: 'K'
  - Phone: 123456789
    ext: +91
```

- Above code translated to JS object as
```javascript
{
  info: [
    { name: 'Punith K', fName: 'Punith', lName: 'K' },
    { Phone: 123456789, ext: 91 }
  ]
}
```

- `Associative arrays` are represented using colon `:` in the format of key value pair.
  They are enclosed in curly braces `{}`
```yaml
info:
  - name:
    - fName: 'Punith'
    - lName: 'K'
```

- output in JS
```javascript
{
  info: [
    { name: [
        { fName: 'Punith' },
        { lName: 'K' }
      ]
    }
  ]
}
```

- Multiple documents with single streams are separated with 3 hyphens `---`.
- `Repeated nodes` in each file are initially denoted by an ampersand `&` and by an asterisk `*` mark later.
- YAML always requires `colons` and `commas` used as list separators followed by `space` with scalar values.
- Nodes should be labelled with an exclamation mark `!` or double exclamation mark `!!`,
  followed by `string` which can be expanded into an `URI or URL`.
