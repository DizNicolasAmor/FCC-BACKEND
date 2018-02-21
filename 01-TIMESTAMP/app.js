let express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	moment = require('moment');

let app = module.exports = express();
app.use( bodyParser.json() );
app.use(cors());

//main
app.get('/', (request, response) => {
	response.json({
		hello: 'Welcome to my timestamp microservice',
		todo: 'Write an unix or a natural date in the URL. ',
		example1: 'path/1450137600',
		example2: 'path/December%2015,%202015',
		moreInfo: 'https://www.freecodecamp.org/challenges/timestamp-microservice'
	});
});


//user inserts value
app.get('/:value', (request, response) =>{
  let data = {
  	unix: null, 
  	natural: null
  },
  unixValue = moment.unix(request.params.value),
  naturalValue = moment(request.params.value);

  // If value is valid unix
  if (unixValue.isValid()) {
    data = {
      unix: request.params.value,
      natural: unixValue.format("MMMM D, YYYY")
    }
  // else if value is valid natural
  } else if (naturalValue.isValid()) {
    data = {
      unix: naturalValue.unix(),
      natural: naturalValue.format("MMMM D, YYYY")
    };
  }
  //response
  response.send(data);

});

//port 8000
app.listen(8000, () => {
	console.log('hello world!');
});