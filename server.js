const express = require('express');
const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req,res)=>{
    res.json(db)
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));