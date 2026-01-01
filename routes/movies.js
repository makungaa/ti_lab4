const express = require('express');
const router = express.Router();
const db = require('../db');

// get liste filmow
router.get('/', (req, res) => {
    const sql = `
    SELECT
      m.Id,
      m.Title,
      m.Year,
      ROUND(AVG(r.Score), 2) AS AvgScore,
      COUNT(r.Id) AS Votes
    FROM Movies m
    LEFT JOIN Ratings r ON r.MovieId = m.Id
    GROUP BY m.Id, m.Title, m.Year
    ORDER BY AvgScore DESC, Votes DESC
  `;

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json(err);

        const result = rows.map(r => ({
            ...r,
            AvgScore: r.AvgScore ?? 0
        }));

        res.json(result);
    });
});

//dodawanie filomu
router.post('/', (req, res) => {
    const { title, year } = req.body;

    if (!title || year === undefined) {
        return res.status(400).json({
            error: 'tytul i rok sa wymagane'
        });
    }

    const yearNum = Number(year);

    if (!Number.isInteger(yearNum) || yearNum < 1888) {
        return res.status(422).json({
            error: 'rok musi byc poprawnym numerem'
        });
    }

    db.run(
        'INSERT INTO Movies(Title, Year) VALUES (?, ?)',
        [title, yearNum],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: 'blad bazy'
                });
            }

            res
                .status(201)
                .set('Location', `/api/movies/${this.lastID}`)
                .json({
                    id: this.lastID,
                    title,
                    year: yearNum
                });
        }
    );
});




module.exports = router;
