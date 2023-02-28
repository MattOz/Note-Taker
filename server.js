const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const notes = require('./db/notes');
const path = require('path');

const { clog } = require('./middleware/clog');
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received to get reviews`);
  return res.status(200).json(notes)
});

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));