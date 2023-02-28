const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const { clog } = require('./middleware/clog');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.get("/", (req,res)=>{
//     res.json(db)
// })

app.get('/api/db', (req, res) => res.json(db));

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));