const 	express = require('express'),
		whoami = express.Router();


whoami.get('/', (request, response) =>{
  //in order to look at the headers json, uncomment the following line and comment the rest. 
  //  response.send({ header: request.headers });

  let data = {
  	ipaddress: request.headers['host'], 
  	language: request.headers['accept-language'].split(',')[0],
    software: request.headers['user-agent'].split(') ')[0].split(' (')[1],
  }; 

  //response
  response.send(data);

});

module.exports = whoami;
