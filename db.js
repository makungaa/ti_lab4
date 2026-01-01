const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'lab4.db');
const INIT_SQL = path.join(__dirname, 'db', 'init.sql');

const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error('DB open error:', err.message);
        return;
    }

    console.log('SQLite connected');

    db.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Movies'",
        (err, row) => {
            if (err) return console.error(err.message);

            if (!row) {
                console.log('Initializing database...');
                const sql = fs.readFileSync(INIT_SQL, 'utf8');
                db.exec(sql, (err) => {
                    if (err) console.error('Init error:', err.message);
                    else console.log('Database initialized');
                });
            }
        }
    );
});

db.run('PRAGMA foreign_keys = ON');

module.exports = db;
