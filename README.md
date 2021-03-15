# Authentication

## PostgreSQL Setup

Installation and Setup:

```shell
    # Install postgres and utils.
    sudo apt install postgresql postgresql-contrib
    
    # Edit the config file:
    sudo nano /etc/postgresql/12/main/pg_hba.conf
    # Change the socket connection auth method to 'md5':
    # # TYPE    DATABASE   USER   ADDRESS   METHOD
    #   local   all        all              md5
    
    # Restart the PostgreSQL server.
    sudo service postgresql restart  
```

Creating an user and database:

```shell
    # Access the PostgreSQL default user.
    sudo -i -u postgres

    # Create a database
    createdb <database_name>

    # Create a user
    createuser --interactive
    
    Enter name of role to add: <username>
    Shall the new role be a superuser? (y/n) n
    Shall the new role be allowed to create databases? (y/n) n
    Shall the new role be allowed to create more new roles? (y/n) n

    # Change the user password
    \password <username>

    # Access the database.
    psql -d <database_name> -U <username> -W
```

## Prisma Setup

For Prisma to be able to connect to the database, create the .env file:

```
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
```

To create the required tables, run `npx prisma db push --preview-feature`

To visualize the database, run `npx prisma studio`

> Every time the `prisma/schema.prisma` file gets updated, the prisma client must be updated using
`npx prisma generate`