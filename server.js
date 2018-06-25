'use strict';

// Load array of notes
//const data = require('./db/notes');

//console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require('./db/notes');

const app = express();

// ADD STATIC SERVER HERE

/*function findNote(body) {
    // we use destructuring to get the values for adjective1, adjective2, etc.
    // from the request params
    const {noteId} = req.params;
    // then we return a string that substitutes in these values
    return (
    
        data.find(item => item.id === noteId);
    )};



*/

app.get('/api/notes', (req, res) => {
    res.json(data);
  });
  app.get('/api/notes/:id', (req, res) => {
    res.json(data[req.params.id]);
  });

  app.get('/api/notes/:id', (req, res) => {
    const id =req.params.id;
   const dataNew = data.find(item => item.id === Number(id));
   return res.json(dataNew);

  });



 // app.post('/', (req, res) => res.send(findNote(req.noteId)));

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});