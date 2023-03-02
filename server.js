// imports
const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const path = require ('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');

// GET request for /notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

// GET request for entire notes database 
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/notes.json', 'utf-8', (err, data) =>{
        if (err) {
            console.log(err)
        }
        res.json(JSON.parse(data));
    })
})

// GET request for index page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// listens for and logs current port being used
app.listen(PORT, ()=> {
    console.log(`Notes app listening at http://localhost:${PORT}`);
});

// POST request for notes database, uses uuid and fsUtils to append data with uniqe id for each note
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
      readAndAppend(newNote, './db/notes.json');
      const response = {
        status: 'success',
        body: newNote,
      };
      res.json(response);
    } 
});