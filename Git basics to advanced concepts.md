## Git: Basic to advanced concepts

### Adding an existing project

- Initialize a git repository
```
git init
```

- Add all the files changed to staging, make sure you added `.gitignore` file to not to commit binary and `node_modules` folder to git
```
git add .
```

- Commit your changes with a commit message add remote to track local changes
```
git commit -m "First commit"
git remote add origin <remote repository URL>
```

- Verifies the new remote URL
```
git remote -v
```

- Publish your changes to `master` branch
```
git push origin master
```

- Pull unrelated histories
```
git pull origin master --allow-unrelated-histories
```

- List all branches in local working copy
```
git branch
```

- Push the created branch to remote
```
git push origin <branch-name>
```

### Git Configuration

- To set user name and email address
```
git config --global user.name "Punith K"
$ git config --global user.email "PunithK@gmail.com"
```
- Set `notepad++` as your default editor, it can be any text editor of your choice, by default git ships, `vim` as default editor.
```
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"
```

- By default git supports 260 character file paths. This has been fixed since git-bash 1.9, but it's not turned on by default.
```
git config --global core.longpaths true
```

- If you're having issues cloning long file paths try the following:
```
git clone -c core.longpaths=true <your.url.here>
```

- Filename too long in git for windows:
```
git config --system core.longpaths true
```

- Set merge conflicts style which shows `ours` and `theirs` in the merge conflict which is easier to resolve merge conflict
```
git config --global merge.conflictstyle diff3
```

### To get the last 5 log entries for the specific user
```
git log --oneline -5 --author <author-name>
git shortlog -> groups commits by user
```

### Reset all the staged files
```
git reset HEAD -- .
```

### Git `fetch` and `pull`

```
git fetch origin
```		
- Fetches new branches from a remote repository - but it doesn't integrate any of this new data into your working files.
fetch will never manipulate, destroy, or screw up anything. This means you can never fetch often enough.

```
git pull origin master  
```
- it does `git fetch` followed by `git merge`, updates current HEAD branch with the latest changes from the remote server. This means that pull not only downloads new data; it also directly integrates it into your current working copy files.

This has a couple of consequences:
- Since `git pull` tries to merge remote changes with your local ones, a so-called "merge conflict" can occur.

- It is highly recommended to start a `git pull` only with a clean working copy. This means that you should not have any uncommitted local changes before you pull.

### Create new Branch and switch to it
```
git checkout -b <branch-name>  
```		
option -b creates the branch and checkout to the branch created.

### Merge two branches without fast-forward
```
git merge --no-ff <target-branch>
```
The --no-ff flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward. This avoids losing information about the historical existence of a feature branch and groups together all commits that together added the feature

```
git merge <target-branch-to-merge-with>
```

### Deleting a branch from remote and local
```
git push origin :<brach_name>
```
> NOTE: Though branches are deleted from remote repo, branch are still shown in local copy to delete them in local repo, use the following

```
git branch -d <brach_name>
```
-d option deletes the branch
> NOTE: use -D option if your branch is merged with master or use -d option

### Undoing things

- Unstaging a file:
```
git reset HEAD CONTRIBUTING.md
```

- Unmodifying a Modified File:
```
git checkout -- CONTRIBUTING.md
```

### Git alias: Help type less in the command line
```
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
```

### Passing parameters to git alias
```
git config --global alias.ra ra="!f() {\
    	git branch -D $1 \
    }; f"
```

### Remove untracked files
- resets the staged changes for the given commit-hash
```
git reset --hard
git clean -df
```
-d for untraced directories and -f for untracked files

## Advanced git commands - David Baumgold - Advanced git - PyCon - 2015
```
$ git show  <commit_hash>
```
Shows the information about current commit if no arguments passed to it, if commit hash passed it shows more info about that commit

```
git blame <file_name_in_that_branch>
```
For each line of the file, blame will find the last commit to edit the line and commit hash, author, date of commit

- Specify the line range
```
git blame -L 12,22 <file-name>
```

### Cherry-pick
- moving commits to other branches (if the commits are moved to `master` branch instead of `feature` branch)

- `cherry-pick` doesn’t alter the existing history within a repository; instead, it adds to the history.
As with other Git operations that introduce changes via the process of applying a diff,
you may need to resolve conflicts to fully apply the changes from the given commit.

```
git show
```		
Will show the modified changes in the recent comment

```
git log --oneline
```
Lists all the commits, copy the commit hash (copy first 6 or 7 chars, it is sufficient to pass it as argument to cherry-pick)

```
git checkout <feature-to-cherry-pick
git cherry-pick <commit-hash>
```    
It creates an entirely new commit based off the original commit and its commit message and it doesn't delete the original commit

- Once the new commit is created in the 'feature', delete the old commit in 'master' by running
```
git reset --hard HEAD^
```
where,
```
HEAD -> The Commit I'm currently sitting on
HEAD^	-> The commit's parent
HEAD^^ -> This commi's grand parent
HEAD~5 -> Five commits back from the current commit, it is equivalent to HEAD^^^^^
```  

### Rebase:

- https://www.atlassian.com/git/tutorials/merging-vs-rebasing/conceptual-overview

- Changes the history of the commits

- Never change history when other people are working on your branch, unless they know you're doing so

- Never change history on 'master'

- Best Practice: Only change the history for commits that have not yet been pushed
`eg:` `master` has changed since started my feature and to bring feature branch up to date with `master`

- rebase finds the merge base, cherry-picks all the commits, and reassings the branch pointer
```
git rebase master
```

- It may throw error like commits are diverged and if you try to push it won't allow then force push the commit in the feature
```
git push -f <branch-name>
```

- If it shows merge conflicts, check the status
```
git status
```

- If you are in the middle of rebase and got conflicts, resolve the conflicts manually (conflicts looks similar to merge conflicts, resolving merge conflicts creates new commit, while rebase is not), or you can cherry-pick to resolve conflicts, then run

```
git rebase --continue
```

- If you want to rebase later and fix the conflicts later
```
git rabase --abort
```

### Data Recovery: reflog

-	Git silently records what your HEAD is every time you change it.

-	Each time you commit or change branches, the reflog is updated.
```
$ git log -g  
```
which will give you a normal log output for your reflog.

```
git branch <recovey-branch> <commit-hash-to-be-recovered-from-the-reflog>
```

- If you want to reset to particular commit to get the data:
```
git reset --hard <commit-hash>
```
Commit hash in the form of `HEAD@{3}`, to reset the branch pointer to the commit

- If you delete the recovery branch and from .git/logs/ as follows:
```
git branch -D <recover-branch>
rm -Rf .git/logs/
```

- To recover from use `fsck` utility to recover the data:
```
git fsck --full
```
It shows you all objects that aren’t pointed to by another object

### Squashing and Splitting

#### Squash multiple commits into one commit

- Allows to maintain a clean history, and keep single commit for a fix or an enhancement

- If you want to squash more commits to one commit then use,
```
git rebase --interactive HEAD~5 or <commit-hash>
```    	

- It opens the editor with last five commits showing the action to be performed on them, rename action 'pick' to 'squash' on the commits.
(press 'i' in the keyboard to edit the file in the editor and to save and quit the editor, press 'escape' button to come out of editing mode to normal mode then type :wq -> this commands will saves the file and quits the editor, editor opened behaves more like vi/vim editor in Linux)

- Close the editor and it asks for new commit message, enter some message and save and quit the editor.

- Squashing commits changes history
- Change the actions 'pick' from 'squash' for all the commits you wanted to squash them into one

#### Splitting commits into small commits
```
git rebase -i HEAD~3 or <commit-hash>
```
git will pause in the rebase process to create new commits

- Change `pick` to `edit` for the commit to make changes to save and quit the editor,

- Then pop off the commit using,
```
git reset HEAD^  ->
```
> NOTE: Don't use `--hard` option it may change the commit

- Files added in that commit are in staged area and check with the command
```
git status
```
This will show all the files in its parent commit.

- If that commit contains more files then you can add one file and commit individually.
```
git add <file1>
git commit -m "Sample"
git rebase --continue
```

- Force push your changes to remote branch
```
git push -f origin <feature-branch>
````

#### Remove the commit:
```
git rebase -i HEAD~2 or <commit-hash>
```

- Replace `pick` with `drop`.
- Resolve conflicts if any,
- Publish the changes forcefully,
```
git push -f origin <branch-name>
```

### Creating a pull request

- Pull the changes from remote to local `master`
```
git pull origin master
```

- Go to your feature branch, rebase with `master`, make sure your commit in your `feature` branch are squashed into one commit before rebasing with `master`.
```
git rebase master
```

- If you get any conflicts resolve and continue the rebase, then force push the changes to your branch,
```
git push -f origin <branch-name>
```

Once changes pushed, go to repo in the github, create pull request

### Edit an incorrect commit message
```
git commit --amend -m "YOUR-NEW-COMMIT-MESSAGE"
```

- In case you’ve already pushed your commit to the remote branch then you need to force push the commit with this command:
```
git push -f origin <branch>
```

- If you want to add a new file to the last commit, then add the file to the staging, then add the file,
```
git add <filename>
git commit --amend
```

- To check whether it is part of the last commit, run
```
git log --stat
```

### Delete a remote branch
```
git push origin --delete <branch-name>
```

### Rename local and remote branch
- Rename branch locally
```
git branch -m <old-branch-name> <new-branch-name>   
```

- Delete the old branch
```
git push origin :<old-branch-name>
```

- Push the new branch, set local branch to track the new remote
```
git push --set-upstream origin <new_branch>
```

### Tags:

#### Deleting a remote tag
```
git tag -d <12345>
git push origin :refs/tags/<12345>
```

#### Fetching tags from remote
```
git fetch --tags
```

#### Creating a branch from tag
```
git checkout -b <new-branch> <tag-name>
```

### Un-applying a Stash:

- You can reapply the one you just stashed by using the command shown in the help output of the original stash command:
```
git stash apply
```

- If you want to apply one of the older stashes, you can specify it by naming it, like this:
```
git stash apply stash@{2}
```

- In some use case scenarios you might want to apply stashed changes, do some work,
but then un-apply those changes that originally came from the stash.
Git does not provide such a stash unapply command, but it is possible to achieve the effect by simply
 retrieving the patch associated with a stash and applying it in reverse:
```
git stash show -p stash@{0} | git apply -R
```

- Again, if you don’t specify a stash, Git assumes the most recent stash:
```
git stash show -p | git apply -R
```

- You may want to create an alias and effectively add a stash-unapply command to your Git. `eg:`
```
git config --global alias.stash-unapply '!git stash show -p | git apply -R'
git stash apply
git stash-unapply
```

### Kdiff3 - Resolivng conflicts
- Download Kdiff-3 software and install it.

```
git config --global merge.tool kdiff3
git config --global mergetool.kdiff3.cmd '"C:\\Program Files (x86)\\KDiff3\\kdiff3" $BASE $LOCAL $REMOTE -o $MERGED'
```
Where,
```
$BASE - Base file state before making changes (initial content of the file when branched out from parent branch)
$LOCAL - Base branch to which the rebasing is made
$REMOTE - File in the current branch
$MERGED - The output file with resolved changes from $LOCAL and $REMOTE
```

### Git Tips and Tricks:

- Refer: https://github.com/git-tips/tips

- Checkout to last checked out branch
```
git checkout -
```

- To check whether a branch is merged with `master` or any other branch
- To check merged branches
```
git branch --merged
```

- To check branches merged with `master` branch
```
git branch --merged master
```

- To check un-merged branches
```
git branch --no-merged
```

- Grab a file from another branch without switching branches, make sure file is committed in other branch
```
git checkout <target-branch> -- <path/to/file>
```

- Search log with particular text string in a log
```
git log -S'<search-string>'
```

- Add the modified and un-committed files to the previous commit without changing the commit message, new files should
be added to the staging.
```
git commit -a --amend -C HEAD
```

- List all branches and their up-streams, as well as last commit on branch
```
git branch -vv
```

- List all the files changed in a commit:
```
git show --pretty="" --name-only <commit-hash>
```

- Remove the local branches no longer on remote
```
git remote prune origin
git fetch -p
```

- If you want to see the last committer on a branch.
```
git for-each-ref --format="%(align:30,left)%(color:yellow)%(authorname)%(end) %(align:30,left)%(color:red)%(refname:strip=3)%(end)" --sort=authorname refs/remotes'
```

- If someone squashed the commits in their branch and you are still working on top that branch with old commits without being squashed,
later if they squash all the commits, make sure you follow this to get the clean history to local copy then you can move your code on top it
by cherry-picking your code.
```
- delete the branch locally, make sure you are not in target branch to be deleted
git branch -D <branch-name>

- fetch all the changes from remote
git fetch -p
git remote prune origin

- then switch to branch and cherry-pick your code on top it
```

### gitbash on windows doesn't show chars once git log prints or Ctrl+C pressed (Cursor blinks)

- Press `q` in the terminal to quit the log window, or type `reset` to reset the session

### resolve conflicts in feature branch and rebase with master with a single command

 - `git add . && git rebase --continue`

### Add changes, squash and rebase with master with a single command

- Make sure you have rebased with master and resolved all the conflicts before making changes
  `git add . && git commit -m "Changes" && git rebase -i master`

### References

-	https://www.youtube.com/watch?v=oFYyTZwMyAg

- https://www.git-tower.com/learn/git/ebook/en/command-line/advanced-topics/merge-conflicts

- https://git-scm.com/book/en/v1/Git-Tools-Stashin_

- http://jebaird.com/2013/07/08/setting-up-kdiff3-as-the-default-merge-tool-for-git-on-windows.html

- https://www.youtube.com/watch?v=-CkqiIPAzgQ