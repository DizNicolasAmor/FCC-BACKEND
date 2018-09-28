const express = require('express');
const routes = express.Router();

mongoose = require('mongoose');

const	Urls = require('../data/urls');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urls', 
  (err) => {
    if(err)
      console.log('ERROR', err);
});

//route with largeURL
routes.get('/new/:largeURL(*)', (req, res) =>{
  let generateShortURL = Math.floor(Math.random()*100000).toString();
  let data = new Urls(
    {
      originalURL: req.params.largeURL,
      shortURL: generateShortURL
    } 
  );

  data.save((error) => {
  	if(error)
  		res.send('Error in saving data.');
  });

  res.send(data);
});

//route with shortURL
routes.get('/:shortURL', (req, res) => {
  let currentShortURL = req.params.shortURL;

  Urls.findOne({'shortURL': currentShortURL}).exec().then( (found) => {
    if(found)
      res.redirect(301, found.originalURL);
    else
      res.send({'error': 'Error reading database. '});
  });
});

module.exports = routes;
