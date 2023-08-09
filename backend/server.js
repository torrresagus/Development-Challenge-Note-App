const express = require('express');
const cors = require('cors');
const notesRoutes = require('./src/routes/notes');
const port = 3001;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(notesRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});