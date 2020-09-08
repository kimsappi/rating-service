# Work very much in progress

# About
React/Node.js Express application for a competitive rating system for e.g. sports.

# Instructions
1. Clone the repository
2. Run `./install.sh` or `npm install` in the client and server directories separately
3. Set up your database (`server/env.test.json` for back-end tests and `server/env.development.json` for a usable build, production environment not implemented yet).
4. Run `npm run dev` in both `server/` and `client/`. This will start a development server for the server and client respectively. No production environments yet.
5. The front-end will run at `http://localhost:3000` and the back-end at `http://localhost:3001`

# Notes to self
* Database pool `ssl` value needs to be set to `true` before deployment
