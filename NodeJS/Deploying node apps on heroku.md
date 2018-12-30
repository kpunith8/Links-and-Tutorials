- Sign up with heroku.
- Create new node app in heroku (App can be creatd using heroku-cli as well, 
download `heroku-cli`, if you want to use `heroku-git` to store your files)
- Add the `ProcFile` to your git repo in the root folder, 
`ProcFile` should have the following content, name of the file is case sensitive.

  `web: node index.js`

- add `app.json` file to the root folder, it should have the following content
```javascript
{
  "name": "",
  "description": "",
  "repository": "",
  "logo": "",
  "keywords": ["node", "express", "heroku"],
  "image": "heroku/nodejs"
}
```
- Add additional content missing from your `package.json` from the following repo, 
https://github.com/heroku/node-js-getting-started

- If you want to link your git to heroku, select the app created go to -> `Deploy` section and
select github option (by default it points to heroku-git) and configure your branch and other automatic deployments 
