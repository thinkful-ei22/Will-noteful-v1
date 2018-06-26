'use strict';

// Load array of notes
//const data = require('./db/notes');

//console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require('./db/notes');

const app = express();

const { PORT } = require('./config');

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
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  console.log('Hello');
  const {searchTerm} = req.query;
  if(searchTerm){
    const found = data.filter(item => item.title.includes(searchTerm));
    return res.json(found);
  }
  //else{     
  return res.json(data);
  
});
  

app.get('/api/notes/:id', (req, res) => {

  const id =req.params.id;
  //comes back as a string!
  const dataNew = data.find(item => item.id === Number(id));
  return res.json(dataNew);

});



// app.post('/', (req, res) => res.send(findNote(req.noteId)));

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});