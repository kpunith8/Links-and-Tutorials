## Installation in Mac M1 using homebrew 

```
$ homebrew upgrade

$ homebrew install postgresql
```

- Output from installing the postgresql
```
To migrate existing data from a previous major version of PostgreSQL run:
  brew postgresql-upgrade-database

This formula has created a default database cluster with:
  initdb --locale=C -E UTF-8 /opt/homebrew/var/postgres
For more details, read:
  https://www.postgresql.org/docs/13/app-initdb.html

To have launchd start postgresql now and restart at login:
   
Or, if you don't want/need a background service you can just run:
  pg_ctl -D /opt/homebrew/var/postgres start
```

- Open the postgresql CLI
```
$ psql postgres
```

- Set password to default user, prompts for password, enter the password
```
$ postgres=# \password <user-name>
```

### Create a Role with a query

```
$ postgres=# CREATE ROLE test WITH LOGIN PASSWORD 'password';
```

- Created role is valid in all databases in the database server (or cluster).

- List all the roles created, using
```
$ postgres=# \du
```

- Or query them using
```
$ SELECT rolname FROM pg_roles;
```

- Created role don't have any attributes attched to it, add the `CREATEDB` permission to the new role/user created.
```
$ postgres=# ALTER ROLE test CREATEDB; 
```

- Verify that test role got permission to create the database, [ALTER ROLE documentation](https://www.postgresql.org/docs/current/sql-alterrole.html)

### Create a Role with createuser client application

- Postgres supports [client applications](https://www.postgresql.org/docs/current/reference-client.html) to reduce the friction to create user or db using the syntax `CREATE ROLE ...`

- Create a user test with permissions to create a DB
```
$ postgres=# createuser test --createdb
```

### Login with a created role

- Prompts for password enter the password to login
```
$ psql -U test -W postgres
```
 
### Create a DB with a query

- Create a DB
```
$ postgres=# CREATE DATABASE test;
```

- Once DB created, add at least one user who has permission to access the database.
```
$ postgres=# GRANT ALL PRIVILEGES ON DATABASE test TO test;
```

### Create a DB using createdb client application

```
$ postgres=# createdb test -U <user-name>
```

## Links

- [PostgreSQL client for mac](https://eggerapps.at/postico/)