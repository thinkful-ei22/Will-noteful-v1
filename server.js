'use strict';

// Load array of notes
//const data = require('./db/notes');

//console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require('./db/notes');
const simDB = require('./db/simDB');  // <<== add this
const notes = simDB.initialize(data); // <<== and this

const app = express();
const { PORT } = require('./config');
const {requestLogger} = require('./logger');

app.use(requestLogger);
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
app.use(express.json());

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});


/*app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
*/
app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});
  

app.get('/api/notes/:id', (req, res) => {
const id = req.params.id;
notes.find(id, (err, item) =>{
  if(err) {
    console.error(err);
  }
  if(item) {
    res.json(item);
  }
  else{
    console.log('not found');
  }
});

});

/*app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});
*/
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


// app.post('/', (req, res) => res.send(findNote(req.noteId)));

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});