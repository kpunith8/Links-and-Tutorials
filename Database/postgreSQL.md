# PostgreSQL

## Installation in Mac M1 using homebrew

```bash
brew install postgresql@15
```

Start the psql

```bash
brew services start postgresql@15
```

Open the PostgreSQL CLI

```bash
psql postgres
```

Set password to the default user
```bash
postgres=# \password <user-name>
```
prompts for password, enter the password


### Create a Role with a query

```bash
postgres=# CREATE ROLE test WITH LOGIN PASSWORD 'password';
```

Created role is valid in all databases in the database server (or cluster).
List all the roles created using,

```bash
postgres=# \du
```

- Query the roles created using,

```bash
SELECT rolname FROM pg_roles;
```

Created roles don't have any attributes attched to it, add the `CREATEDB` permission to the new role/user created.

```bash
postgres=# ALTER ROLE test CREATEDB; 
```

Verify that test role got permission to create the database, [ALTER ROLE documentation](https://www.postgresql.org/docs/current/sql-alterrole.html)

### Create a Role with createuser client application

- Postgres supports [client applications](https://www.postgresql.org/docs/current/reference-client.html) to reduce the friction to create user or db using the syntax `CREATE ROLE ...`

Create a user test with permissions to create a DB

```bash
postgres=# createuser test --createdb
```

### Login with a created role

Prompts for password enter the password to login (`postgres` is a default databse)

```bash
postgres=# psql -U <user-name> <password>
```

### Create a DB with a query

Create a DB

```bash
postgres=# CREATE DATABASE test;
```

Once DB created, add at least one user who has permission to access the database.

```bash
postgres=# GRANT ALL PRIVILEGES ON DATABASE test TO test;
```

List the created databases

```bash
postgres=# \l
```

Select a database after login (database can be specified while loging in as well)

```bash
postgres=# \c database-name
```

## Drop a role - If a role owns a database but you want to delete that role

```bash
REASSIGN OWNED BY test TO <newuser>;

# or use this
DROP OWNED BY test;
```

### Revoke all the privileges

```bash
REVOKE ALL PRIVILEGES ON DATABASE music FROM test;
```

### drop the role

```bash
DROP ROLE TEST;
```

## Commands reference

These commands will work inside the psql CLI

```bash
# Create a role with password
CREATE USER test WITH PASSWORD 'secret';

# Created role don't have any privileges, alter the role and grand create db privilege
ALTER ROLE test CREATEDB

# Create a database with a user 
CREATE DATABASE music WITH OWNER 'test' ENCODING 'UTF8';

# List all the roles created
\du

# List all the databases
\l

# List all the tables in a db
\dt

# Describe the table
\d table-name 

# Select the database
\c db-name

# Quit the CLI
\q

# Drop the database
dropdb db-name 

# Run a sql in a file
\i sample.sql
```

## Postgress 4 all course - https://www.pg4e.com/

- [Youtube video](https://www.youtube.com/watch?v=HWXAIDeT5UM&list=PLlRFEj9H3Oj7Oj3ndXmNS1FFOUyQP-gEa)

### Copy csv data to table

```bash
test=# \copy track_raw(title, artist, album, count, rating, len) FROM 'library.csv' WITH DELIMITER ',' CSV;
# track-raw is the table name to which we are loading the data
```

Make sure to create the table before copying it, get the `library.csv` from here,

```bash
curl -O https://www.pg4e.com/tools/sql/library.csv # if curl not present, use wget
wget https://www.pg4e.com/tools/sql/library.csv
```

### Load the sql file

- Download the file using wget or type all the SQL queries into a file and save the file with `.sql` extension.

Example of a sql file
```sql
-- https://www.pg4e.com/lectures/03-Techniques-Load.txt
-- Start fresh - Cascade deletes it all

DELETE FROM account;
ALTER SEQUENCE account_id_seq RESTART WITH 1;
ALTER SEQUENCE post_id_seq RESTART WITH 1;
ALTER SEQUENCE comment_id_seq RESTART WITH 1;
ALTER SEQUENCE fav_id_seq RESTART WITH 1;

INSERT INTO account(email) VALUES 
('ed@umich.edu'), ('sue@umich.edu'), ('sally@umich.edu');

INSERT INTO post (title, content, account_id) VALUES
( 'Dictionaries', 'Are fun', 3),  -- sally@umich.edu
( 'BeautifulSoup', 'Has a complex API', 1), -- ed@mich.edu
( 'Many to Many', 'Is elegant', (SELECT id FROM account WHERE email='sue@umich.edu' ));

INSERT INTO comment (content, post_id, account_id) VALUES
( 'I agree', 1, 1), -- dict / ed
( 'Especially for counting', 1, 2), -- dict / sue
( 'And I don''t understand why', 2, 2), -- dict / sue
( 'Someone should make "EasySoup" or something like that', 
    (SELECT id FROM post WHERE title='BeautifulSoup'),
    (SELECT id FROM account WHERE email='ed@umich.edu' )),
( 'Good idea - I might just do that', 
    (SELECT id FROM post WHERE title='BeautifulSoup'),
    (SELECT id FROM account WHERE email='sally@umich.edu' ))
;
```

- Load the sql file inside the postgress shell, file should be where the postgresql is running

```
postgres=#\i <file-name>.sql
```

### DISTINCT (Vertical replication)

- Show all the distinct models but keep other columns as is
```
SELECT DISTINCT ON (model) make, model, year FROM racing;
```
It eliminates duplicate models but keeps duplicate make and year values.

## Tools

`DBeaver` - Open Source Database tool - Installed on Mac M1

## Links

- [PostgreSQL client for mac](https://eggerapps.at/postico/)

## Username and password created for Mac M1

```sh
punithk - punithk
test - test
```