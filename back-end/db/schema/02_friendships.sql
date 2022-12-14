DROP TABLE IF EXISTS friendships CASCADE;

CREATE TABLE friendships (
  id SERIAL PRIMARY KEY NOT NULL,
  sender INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status BOOLEAN DEFAULT FALSE,
  date_added DATE NOT NULL
);