PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Movies;

CREATE TABLE Movies (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        Title TEXT NOT NULL,
                        Year INTEGER NOT NULL
);

CREATE TABLE Ratings (
                         Id INTEGER PRIMARY KEY AUTOINCREMENT,
                         MovieId INTEGER NOT NULL,
                         Score INTEGER NOT NULL CHECK (Score BETWEEN 1 AND 5),
                         FOREIGN KEY (MovieId) REFERENCES Movies(Id) ON DELETE CASCADE
);

-- Seed movies
INSERT INTO Movies(Title, Year) VALUES
                                    ('Inception', 2010),
                                    ('Matrix', 1999),
                                    ('Arrival', 2016);

-- Seed ratings
INSERT INTO Ratings(MovieId, Score) VALUES
                                        (1, 5),
                                        (1, 4),
                                        (2, 5),
                                        (3, 4),
                                        (3, 5);
