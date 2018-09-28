let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let moment = require('moment');
const port = process.env.PORT || 8000;

let app = express();
app.use(bodyParser.json());
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

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
app.get('/:value', (request, response) => {
  let data = {
    unix: null,
    natural: null
  },
    unixValue = moment.unix(request.params.value),
    naturalValue = moment(request.params.value);

  if (unixValue.isValid()) {
    data = {
      unix: request.params.value,
      natural: unixValue.format("MMMM D, YYYY")
    }

  } else if (naturalValue.isValid()) {
    data = {
      unix: naturalValue.unix(),
      natural: naturalValue.format("MMMM D, YYYY")
    };
  }

  response.send(data);

});

// listen
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
