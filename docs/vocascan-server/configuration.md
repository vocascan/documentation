# Configuration

## 1. Environment variables

| Name                | Description                                                                                                                 | Example                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `PORT`              | Web server port                                                                                                             | `3000`                                         |
| `DB_CONNECTION_URL` | To connect to the database, you can either use a connection url, or set the other env variable start with DB\_ individually | `postgres://user:pass@example.com:5432/dbname` |
| `DB_DIALECT`        | Database dialect. Currently `postgres`, `mysql`, `mariadb` and `sqlite` are only supported                                  | `postgres`                                     |
| `DB_STORAGE`        | SQL File. Only for sqlite dialect                                                                                           | `./db.sql`                                     |
| `DB_HOST`           | Database host                                                                                                               | `localhost`                                    |
| `DB_PORT`           | Database port                                                                                                               | `5432`                                         |
| `DB_USERNAME`       | Database username                                                                                                           | `vocascan`                                     |
| `DB_PASSWORD`       | Database password                                                                                                           |
| `DB_DATABASE`       | Database name                                                                                                               | `vocascan`                                     |
| `JWT_SECRET`        | Random string. You can generate one with `npm run jwt-secret`                                                               |                                                |
| `SALT_ROUNDS`       | Bcrypt salt rounds                                                                                                          | `10`                                           |
| `DEBUG`             | true or false . useful to enable if you have an issue or found a bug                                                        | `false`                                        |
