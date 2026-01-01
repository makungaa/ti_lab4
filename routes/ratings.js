const express = require('express');
const router = express.Router();
const db = require('../db');

//dodawanie oceny do filmu
router.post('/', (req, res) => {
    const { movie_id, score } = req.body;

    if (!movie_id || !score) {
        return res.status(400).json({
            error: 'movie_id i ocena sa wymagane'
        });
    }

    if (score < 1 || score > 5) {
        return res.status(400).json({
            error: 'ocena miedzy 1 a 5'
        });
    }

    db.get(
        'SELECT Id FROM Movies WHERE Id = ?',
        [movie_id],
        (err, movie) => {
            if (err) return res.status(500).json(err);
            if (!movie) {
                return res.status(404).json({
                    error: 'film nie znaleziony'
                });
            }

            // dodaj ocenę
            db.run(
                'INSERT INTO Ratings(MovieId, Score) VALUES (?, ?)',
                [movie_id, score],
                function (err) {
                    if (err) return res.status(500).json(err);

                    res.status(201).json({
                        id: this.lastID,
                        movie_id,
                        score
                    });
                }
            );
        }
    );
});

module.exports = router;
