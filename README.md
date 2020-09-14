# Work very much in progress

# About
React/Node.js Express application for a competitive rating system for e.g. sports.

The 'production' version is deployed [here](https://hive-pong.herokuapp.com/) (requires 42 Intra credentials to access) and an anonymous development version is [here](https://hive-pong-dev.herokuapp.com/).

# Instructions
Note: This assumes a "development" version build with only guest account functionality and your Node.js package manager is `npm`.
```shell
git clone https://github.com/kimsappi/rating-service.git
cd rating-service
./install.sh # Installs required packages with npm
npm --prefix client run build-dev # Builds development version of the front-end and moves it to server/public
export DATABASE_URL=$PostgresConnectionString # The server gets the database address from the environment variable DATABASE_URL in the form:
# postgres://user:password@host:post/database
npm --prefix server run dev # Runs development version of the server
```
Set up your database. Currently there is no automated method, so you'll have to manually source `server/dbSchema.sql` into Postgres.

Finally, navigate to `http://localhost:3001` (or `PORT`).
