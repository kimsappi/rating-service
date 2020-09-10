CREATE TYPE theme AS ENUM ('light', 'dark');
CREATE TYPE color AS ENUM ('default', 'red-green');

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
  id INT NOT NULL PRIMARY KEY,
  username TEXT NOT NULL,
  firstname TEXT DEFAULT NULL,
  lastname TEXT DEFAULT NULL,
  imageurl TEXT DEFAULT NULL,
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

-- Return data about a match and the users associated with it
-- Columns:
-- id time rating_change draw
-- winner_id winner_username winner_score
-- loser_id loser_username loser_score
DROP VIEW IF EXISTS matches_with_users;
CREATE VIEW matches_with_users AS
  SELECT w.id AS winner_id, w.username AS winner_username,
    l.id AS loser_id, l.username AS loser_username,
    winner_score, loser_score, draw, "time", rating_change, m.id AS id
  FROM matches AS m
    JOIN users AS w ON (w.id = m.winner)
    JOIN users AS l ON (l.id = m.loser);

CREATE OR REPLACE FUNCTION update_ratings_post_match()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS
$$
BEGIN
  UPDATE users SET rating = rating + NEW.rating_change, active = TRUE WHERE id = NEW.winner;
  UPDATE users SET rating = rating - NEW.rating_change, active = TRUE WHERE id = NEW.loser;
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_ratings_post_match AFTER INSERT
  ON matches
  FOR EACH ROW
  EXECUTE PROCEDURE update_ratings_post_match();
