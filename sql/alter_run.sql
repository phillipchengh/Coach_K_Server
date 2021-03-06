DROP TABLE IF EXISTS RUN;

CREATE TABLE RUN(
  USER_ID text REFERENCES STUDENT(USER_ID),
  SECONDS int NOT NULL DEFAULT 0,
  MINUTES int NOT NULL DEFAULT 0,
  HOURS int NOT NULL DEFAULT 0,
  DISTANCE float NOT NULL DEFAULT 0,
  TIMESTAMP text NOT NULL DEFAULT '',
  COORDINATES text NOT NULL DEFAULT ''
);
