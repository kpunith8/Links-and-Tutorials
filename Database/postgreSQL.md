# PostgreSQL

## Installation in Mac M1 using homebrew

```bash
brew install postgresql@15
```

- Start the psql
```bash
brew services start postgresql@15
```

- Open the PostgreSQL CLI
```bash
psql postgres
```

- Set password to the default user
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

- Create an user test with permissions to create a DB
```bash
postgres=# createuser test --createdb
```

### Login with a created role

Prompts for password enter the password to login (`postgres` is a default databse)

```bash
postgres=# psql -U <user-name> <password>
```

### Create a DB with a query

- Create a DB
```bash
postgres=# CREATE DATABASE test;
```

- Once DB created, add at least one user who has permission to access the database.
```bash
postgres=# GRANT ALL PRIVILEGES ON DATABASE test TO test;
```

- List the created databases
```bash
postgres=# \l
```

- Select a database after login (database can be specified while loging in as well)
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

## PostgreSQLForEverybody course - https://www.pg4e.com/

- [Youtube video](https://www.youtube.com/watch?v=HWXAIDeT5UM&list=PLlRFEj9H3Oj7Oj3ndXmNS1FFOUyQP-gEa)

### Copy csv data to table

```bash
test=# \copy track_raw(title, artist, album, count, rating, len) FROM 'library.csv' WITH DELIMITER ',' CSV;
# track-raw is the table name to which we are loading the data
```

> Make sure to create the table before copying it, get the `library.csv` from here,

```bash
curl -O https://www.pg4e.com/tools/sql/library.csv # if curl not present, use wget
wget https://www.pg4e.com/tools/sql/library.csv
```

### Load sql file

- Download the file using wget or type all the SQL queries into a file and save the file with `.sql` extension.

```sql
-- sql file example
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

### Update a table and return the results

```sql
UPDATE fav SET title='Everyday is different' WHERE id = 1 RETURNING *;
```

### DISTINCT (Vertical replication)

- Show all the distinct models but keep other columns as is
```sql
SELECT DISTINCT ON (model) make, model, year FROM racing;
```
It eliminates duplicate models but keeps duplicate make and year values.

### Sub queries (nested queries, inner queries)

- They are bit slow, outer query should wait until the sub query executes not for performant queries.

- Use sub query result as a table and apply WHERE clause on it
```sql
SELECT ct, abbrev FROM (SELECT COUNT(abbrev) as ct, abbrev FROM pg_timezone_names WHERE is_dst='f' GROUP BY abbrev)
  AS zap where ct > 10;
```

### Transactions and concurrency

Use `ON CONFLICT` clause to avoid duplicate values being written to DB from different clients.
```sql
INSERT INTO fav (post_id, account_id, howmuch)
  VALUES (1,1,1)
  ON CONFLICT (post_id, account_id) 
  DO UPDATE SET howmuch = fav.howmuch + 1
  RETURNING *;
```

- Locks, rollback and commit
```sql
-- Run in one terminal
BEGIN;
SELECT title FROM album WHERE id=1 FOR UPDATE OF album; -- Lock
-- Time passes
UPDATE album SET title='new title' WHERE id=1;
SELECT title FROM album WHERE id=1;
-- Rollback should be run after terminal 2 wants to run the query.
ROLLBACK; -- rollback the changes

-- Try opening another terminal and lock the UPDATE on fav and try to execute 
BEGIN;
SELECT title FROM album WHERE id=1 FOR UPDATE OF album;
-- It waits for other lock to be released running `ROLLBACK;` command in the first terminal and then this query executes.
COMMIT;
```

### Stored Procedures

- Stored procedure to update timestamp automatically
```sql
-- https://x-team.com/blog/automatic-timestamps-with-postgresql/
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Once a stored procedure is created, create a trigger on the table to trigger it automatically.
```sql
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON album
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
```

- The moment `UPDATE` is done on album table `updated_at` column is created.

### Insert the results of a query into another table

```sql
-- title is the column name in the fav table, if you want insert multiple columns specify the columns comma separated.
INSERT INTO fav (title) SELECT DISTINCT title FROM album ORDER BY title;
```

### Generating and Scanning Text

#### Built-in functions

- random(), trunc()
```sql
SELECT random(), random(), trunc(random() * 100); 
```

- repeat() 
```sql
SELECT repeat('Neon', 5); -- Neon Neon Neon Neon Neon
```

- generate_series()
```sql
SELECT generate_series(1, 5); -- 1, 2, 3, 4, 5 (generates 5 rows)
```

- String concatenation (||)
```sql
SELECT 'Neon' || generate_series(1, 5); -- Neon1 Neon2 Neon3 Neon4 Neon5 (generates 5 rows)
```

- `BTree` index is default
```sql
CREATE INDEX text_b ON text_table (content); -- content is a column, text_b is index name
```

- Check the index size, size of the index grows as we add more data to the table.
```sql
SELECT pg_relation_size('text_table'), pg_indexes_size('text_table');
```

- Generate text using `CASE` and concatenate
```sql

SELECT (CASE WHEN (random() < 0.5)
         THEN 'https://www.pg4e.com/neon/'
         ELSE 'https://www.pg4e.com/LEMONS/'
         END) || generate_series(1000, 1005);
-- Generates https://www.pg4e.com/neon/1000, https://www.pg4e.com/LEMONS/1001, and so on upto 1005 (6 rows), based on the WHEN condition's result
```

- Insert the data to table using generate_series()
```sql
INSERT INTO text_table (content)
SELECT (CASE WHEN (random() < 0.5)
         THEN 'https://www.pg4e.com/neon/'
         ELSE 'https://www.pg4e.com/LEMONS/'
         END) || generate_series(100000, 200000);
```

- String matching with `LIKE`, `%` matches zero or more chars and `_` matches a single char 
```sql
SELECT content FROM text_table WHERE content LIKE '%150000%'; -- Match the text 150000 and there can be any chars before and after

SELECT upper(content) FROM text_table WHERE content LIKE '%150000%'; -- Returns uppercase text of the string found

SELECT lower(content) FROM text_table WHERE content LIKE '%150000%'; -- Returns lowercase text of the string found

SELECT right(content, 4) FROM text_table WHERE content LIKE '%150000%'; -- 5 right chars

SELECT left(content, 4) FROM text_table WHERE content LIKE '%150000%'; -- 4 left chars

SELECT strpos(content, 'ttp://') FROM text_table WHERE content LIKE '%150000%'; -- string position

SELECT substr(content, 2, 4) FROM text_table WHERE content LIKE '%150000%'; -- substring from 2nd position to 4th position

SELECT split_part(content, '/', 4) FROM text_table WHERE content LIKE '%150000%'; -- Split the content by / and get the 4th part

SELECT translate(content, 'th.p/', 'TH!P_') FROM text_table WHERE content LIKE '%150000%'; -- Replaces t -> T, . -> ! and so on in the matched strig

SELECT content FROM text_table WHERE content LIKE '%150_00%'; -- Matches a single char after 150

SELECT content FROM text_table WHERE content IN ('https://www.pg4e.com/neon/150000', 'https://www.pg4e.com/neon/150001'); -- IN operator can be used for querying
```

### Regular expressions



## Built-in databases

- `pg_timezone_names` - Has name, abbreviation, utc_offset, and is_dst (is date time savings enabled or not) columns

## Commands reference

These commands will work inside the psql CLI, commonds are not case sensitive.

```bash
# Initial login 
$ psql postgres

# Set password to the default user
postgres=# \password <user-name>

# Login with created user
postgres=# psql -U <user-name> <password>

# Create a role with password
postgres=# CREATE USER test WITH PASSWORD 'secret';

# Created role don't have any privileges, alter the role and grand create db privilege
postgres=# ALTER ROLE test CREATEDB;

# Create a database with a user 
postgres=# CREATE DATABASE music WITH OWNER 'test' ENCODING 'UTF8';

# Grant all previleges to database to a user
postgres=# GRANT ALL PRIVILEGES ON DATABASE <db-name> TO <user-name>;

# List all the roles created
postgres=# \du

# List all the databases
postgres=# \l

# List all the tables in a db
postgres=# \dt

# Describe the table
postgres=# \d <table-name>

# Select the database
postgres=# \c <db-name>

# Drop the database
postgres=# dropdb db-name 

# Run a sql queries saved in a file
postgres=# \i sample.sql

# Quit the CLI
postgres=# \q
```

## Tools

`DBeaver` - Open Source Database tool - Installed on Mac M1

- When connecting using Dbeaver make sure to use the proper db name,

## Links

- [PostgreSQL client for mac](https://eggerapps.at/postico/)

## Username and password for M1 Mac - local client

```sh
punithk - punithk
test - test
```