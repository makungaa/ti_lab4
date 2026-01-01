const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/movies', require('./routes/movies'));
app.use('/api/ratings', require('./routes/ratings'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
