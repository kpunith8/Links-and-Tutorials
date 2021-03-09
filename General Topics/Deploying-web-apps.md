## Heroku deployment

- Sign up with `heroku`, download the heroku cli and login

- Create new node app in heroku (App can be created using heroku-cli as well,
download `heroku-cli`, if you want to use `heroku-git` to store your files)

- Add the `Procfile` to your project root folder, and should be committed to source control
  `Procfile` should have the following content, name of the file should be `case sensitive`.
```
# It should point to the main entry file for it can be eg., auth/index.js, because index.js inside auth folder has the entry point
web: node index.js 
# Refer https://stackoverflow.com/questions/31092538/heroku-node-js-error-r10-boot-timeout-web-process-failed-to-bind-to-port-w
worker: node index.js # If it is not a server, for services like discord bots this is the best option
```

- Add `app.json` file to the root folder, it should have the following content (Optional)
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

- Install the heroku CLI
```
$ npm install -g heroku
```

- Run these commands to login and create the project

```
$ heroku login // opens the browser

$ heroku login -i // Asks for username and password in command lines

$ heroku create // Assigns the name to the app

$ git push heroku master // Push it to heroku git

$ heroku open // to open the app

$ heroku apps // to list all the apps hosted under the user name
```

- If you want to link your git to heroku, select the app created go to ->
  `Deploy` section and Select `github` option (by default it points to heroku-git)
  and configure your branch and other automatic deployments.

- Once automatic deployments are enabled, no need to push to `heroku master`
  push to your repo's master branch or designated release branch, it triggers
  build automatically.

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
$ git remote rm heroku

$ heroku git:remote -a newname
```

## Updating the environment variables

### Using the Heroku CLI

- View current config var values
```
$ heroku config
```

- Get a specific config by name
```
$ heroku config:get GITHUB_USERNAME
```

- Set a config variable
```
$ heroku config:set GITHUB_USERNAME=joesmith
```

- Remove a config variable
```
$ heroku config:unset GITHUB_USERNAME
```

### Using heroku dashboard

- Goto app ~> `Settings` ~> `Config Variables` section to add and remove

## Vercel - static websites

- Download the `CLI` and login and deploy, follow the guidelines in the official documentation

- Make sure to remove `homepage` url from `package.json` if it exists, before publishing.

# Netlify

## Netlify - _headers file or netlify.toml to include .well-known folder content

- https://stellar.stackexchange.com/questions/2870/reactjs-netlify-hosting-stellar-toml-downloading-when-navigating-to-well

- https://github.com/11ty/eleventy/issues/1049

- Can be useful adding Brave token subscription, create `_headers` file in the project root
  ```
  # the brave-rewards-verification.txt
  /.well-known/brave-rewards-verification.txt
    Access-Control-Allow-Origin: *
    Content-Type: text/plain
  ```

- Create `.well-known` folder and move the files inside
