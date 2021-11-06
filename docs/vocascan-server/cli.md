# Command Line Interface

## Usage

```bash
Usage: vocascan-server [options] [command]
```

## Global Options

- `-v`, `--version` output the version number
- `-c`, `--config-file <path>` specify a path to a custom configuration file
- `-h`, `--help` display help for command

## Commands

### admin

manage admin resources

#### user

manage vocascan users

**Subcommands:**

##### create

Creates a user in the configured database.

- `-u`, `--username <username>` - username for the new user (required)
- `-e`, `--email <email>` - email for the new user (required)
- `-p`, `--password <password>` - password for the new user. If not set, a password of length `48` will be generated and
  printed.
- `-r`, `--role <name>` - chose a role for the new user. By default there are the following roles `admin`, `user`.
  (default: `user`)

**Examples**

- `vocascan-server admin user create -u admin -e admin -r admin` - will create a user with this specifications: name:
  `admin`, email: `admin`, role: `admin`, password: random.
- `vocascan-server admin user create -u hans -e hans@gmail.com -r user -p abcdefg` - will create a user with this
  specifications: name: `hans`, email `hans@gmail.com`, role `user`, password `abcdefg`.

!> it does not have to be a real email, it's only a login name with which you can log in to vocascan-server to
administrate your server.

##### list

Lists all users registered in the configured database.

- `-r`, `--role <name>` - filter for a specific role name.

**Examples**

- `vocascan-server admin user list --role admin` - will only print users with the admin role
- `vocascan-server admin user list` - will print all users registered in your database

##### update

Update a user.

- `-i`, `--id <id>` - id to identify the user (one of `--id` or `--username` is required)
- `-u`, `--username <username>` - username to identify the user (one of `--id` or `--username` is required)
- `-p`, `--password <password>` - new password (don't set if you don't want to change the user's password)
- `-r`, `--role <name>` - new role (don't set if you don't want to change the user's role)

**Examples**

- `vocascan-server admin user update -u admin -p Passw0rd` - will set `Passw0rd` as a new password for the admin user
- `vocascan-server admin user update -i bd9c643e-c820-4b0c-bd04-f2d93f4e4dcb -r admin` - will give the user with the id
  `bd9c643e-c820-4b0c-bd04-f2d93f4e4dcb` the `admin` role

##### delete

Deletes a user.

- `-i`, `--id <id>` - id to identify the user (one of `--id` or `--username` is required)
- `-u`, `--username <username>` - username to identify the user (one of `--id` or `--username` is required)
- `-y`, `--yes` - Confirm directly that you want to delete that user. If this flag is not set, you will be interactively
  prompted to confirm that operation

**Examples**

- `vocascan-server admin user delete -u hans` - will completely delete the user named `hans` after you interactively
  confirm
- `vocascan-server admin user delete -i bd9c643e-c820-4b0c-bd04-f2d93f4e4dcb -y` - will completely delete the user with
  the id `bd9c643e-c820-4b0c-bd04-f2d93f4e4dcb` without confirming (you set `--yes`)

### generate

generation functions for strings needed in config files

**Subcommands:**

#### secret [type]

generate secrets to use in the config file

Types:

- `JWT_SECRET`

**Examples**

- `vocascan-server generate secret JWT_SECRET` - will generate a random string which can be used in your config as a
  `server.jwt_secret`

### web

starts the vocascan-server

### help [command]

display help for command

**Examples**

- `vocascan-server help generate` - will display the help for the generate command

?> **Tip:** you can also set the `--help` flag on a command

- `vocascan-server admin user --help` - will show all user management commands (`create`, `list`, `update`, `delete`)
