## Heroku deployment

- Sign up with heroku, download the heroku cli and login

- Create new node app in heroku (App can be created using heroku-cli as well,
download `heroku-cli`, if you want to use `heroku-git` to store your files)

- Add the `ProcFile` to your git repo in the root folder,
`ProcFile` should have the following content, name of the file should be case sensitive.
```
web: node index.js
```

- Add `app.json` file to the root folder, it should have the following content
```javascript
{
  "name": "mongo API",
  "description": "Authentication app with mongo",
  "repository": "github link to repo",
  "logo": "https://cdn.rawgit.com/heroku/node-js-getting-started/master/public/node.svg",
  "keywords": ["node", "express", "heroku"],
  "image": "heroku/nodejs"
}
```

- Refer, https://github.com/heroku/node-js-getting-started for more info
```
$ heroku login
$ heroku create
$ git push heroku master
$ heroku open
```

- If you want to link your git to heroku, select the app created go to ->
  `Deploy` section and Select `github` option (by default it points to heroku-git)
  and configure your branch and other automatic deployments


## Renaming heroku app name

- Rename an app at any time with the `heroku apps:rename` command.
  For example, to rename an app named “oldname” to “newname”, run the `heroku apps:rename`
  command from `your app’s Git` repository
  ```
  $ heroku apps:rename newname
  ```

- Renaming can also be done from outside of its associated Git repository
  by including the `--app` option in the command:
  ```
  heroku apps:rename newname --app oldname
  ```

##  Updating Git remotes - If the app name is renamed from heroku website

- If you use the Heroku CLI to rename an app from inside its associated Git repository, your local Heroku remote is updated automatically.
However, other instances of the repository must update the remote’s details manually.

- Run the following commands to update the remote’s details in other repository instances:
```
git remote rm heroku
heroku git:remote -a newname
```


## Vercel - static websites

-
