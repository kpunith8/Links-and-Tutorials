# MySQL

## Installation on Mac using homebrew

[Reference](https://flaviocopes.com/mysql-how-to-install/)

```
brew install mysql
```

Once installed start the `mysql` service
```
brew services start mysql
```

Run `mysql_secure_installation` to setup secure defaults for the DB

Stop the service and restart it again to affect the changes made
```
brew services stop mysql
```

To stop this from happening, and also to immediately stop MySQL.

You can also avoid this daemon mode (that’s what we call programs that always
run in the background and restart when the computer is restarted) by running:
```
mysql.server start
```

This will start MySQL and will keep it running until the computer is shut down, or until you run:
```
mysql.server stop
```
and it will not re-start it at reboot.

Now you can connect to the server using the command:
```
mysql -u root -p
```
Enter the root password created above to login to the DB in command line


## Create an user

[Reference](https://flaviocopes.com/mysql-how-to-create-user/)

First login with root password,

Syntax to create a new user and password is,
```
CREATE USER '<username>'@'localhost' IDENTIFIED BY '<password>';
```

for eg, create a `test_user` with password `test_password12A` as follows
```
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'test_password12A';
```

Once done login as,
```
mysql -u test_user -p
```

The `@'localhost'` string used to create the user, tells `MySQL` that the user can only connect from localhost.
Which is fine when testing things out and when any application that will connect
to MySQL is running on the same computer that runs the DBMS.

When this is not true, you either need to manually enter the IP the user will connect from, or use the `% wildcard`:
```
CREATE USER 'test_user'@'%' IDENTIFIED BY 'test_password12A';
```

### Creating a database as a non root user

```
CREATE DATABASE books
```

Newly created user may get an error while creating the database,
`ERROR 1044 (42000): Access denied for user 'test_user'@'localhost' to database 'testing`

Because the user `does not have the permission` to create a new database

### Grant Privileges to newly created users

[Reference](https://flaviocopes.com/mysql-user-permissions/)

Use the `GRANT` command.

Use `GRANT <permission>` syntax with the following permission keywords
```
CREATE
DROP
DELETE
INSERT
SELECT
UPDATE
ALL PRIVILEGES
```

Give privilege to create new databases to a user
```
GRANT CREATE ON *.* TO '<username>'@'localhost';
```

Give privileges to a user to create new tables in a specific database
```
GRANT CREATE ON <database>.* TO '<username>'@'localhost';
```

Give privilege to read (query) a specific database to a user
```
GRANT SELECT ON <database>.* TO '<username>'@'localhost';
```

Give privilege to read a specific database table to a user
```
GRANT SELECT ON <database>.<table> TO '<username>'@'localhost';
```

Give privilege to insert, update and delete rows in a specific database to a user
```
GRANT INSERT, UPDATE, DELETE ON <database>.* TO '<username>'@'localhost';
```

Give privilege to delete tables in a specific database to a user
```
GRANT DROP ON <database>.* TO '<username>'@'localhost';
```

Give privilege to delete databases to a user
```
GRANT DROP ON *.* TO '<username>'@'localhost';
```

Give all privilege on a specific database to a user
```
GRANT ALL PRIVILEGES ON <database>.* TO '<username>'@'localhost';
```

Give all privileges to a user
```
GRANT ALL PRIVILEGES ON *.* TO '<username>'@'localhost';
```

### Revoke a Privilege

Example to revoke the DROP privilege on <database>
```
REVOKE DROP ON <database>.* TO '<username>'@'localhost';
```

To revoke `all privileges`, run
```
REVOKE ALL PRIVILEGES ON *.* TO '<username>'@'localhost';
```

Visualize the privileges of a single user by running
```
SHOW GRANTS FOR '<username>'@'localhost';
```

## Delete an User

```
DROP USER 'test_user'@'localhost';
```

## Creating tables

Syntax to create a table with primary key (PK), with AUTO_INCREMENT ids
```
CREATE TABLE products (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  price DOUBLE(16,4) NOT NULL DEFAULT 0.00,
  name VARCHAR(100) NOT NULL,
  description TEXT,
)
```

Add `PK` on the ply
```
ALTER TABLE t8 ADD PRIMARY KEY(col1, col2);
```

Drop the `PK`
```
ALTER TABLE t8 DROP PRIMARY KEY;
```

Alter column datatype
```
ALTER TABLE tablename MODIFY columnname INTEGER;
```

With foreign key
```
CREATE TABLE parent (
    id INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE child (
    id INT,
    parent_id INT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id)
        REFERENCES parent(id)
        ON DELETE CASCADE
) ENGINE=INNODB;
```

## Links

Download `TablePlus` GUI to interact with the SQL databases, https://tableplus.com.
