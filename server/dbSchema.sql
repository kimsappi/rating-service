CREATE TYPE theme AS ENUM ('light', 'dark');
CREATE TYPE color AS ENUM ('default', 'red-green');

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
  id INT NOT NULL PRIMARY KEY,
  username TEXT NOT NULL,
  firstName TEXT DEFAULT NULL,
  lastName TEXT DEFAULT NULL,
  imageUrl TEXT DEFAULT NULL,
  rating INT DEFAULT 2000,
  active BOOLEAN DEFAULT FALSE,
  theme theme DEFAULT 'light',
  color color DEFAULT 'default'
);

DROP TABLE IF EXISTS matches;
CREATE TABLE IF NOT EXISTS matches(
  id SERIAL PRIMARY KEY,
  winner INT NOT NULL,
  loser INT NOT NULL,
  winner_score INT NOT NULL,
  loser_score INT NOT NULL,
  rating_change INT NOT NULL,
  submitter INT NOT NULL,
  "time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  draw BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (winner) REFERENCES users(id),
  FOREIGN KEY (loser) REFERENCES users(id),
  FOREIGN KEY (submitter) REFERENCES users(id)
);

DROP TABLE IF EXISTS bans;
CREATE TABLE IF NOT EXISTS bans(
  id INT PRIMARY KEY,
  FOREIGN KEY (id) REFERENCES users(id)
);
