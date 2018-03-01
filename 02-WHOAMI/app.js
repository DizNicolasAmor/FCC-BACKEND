let express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors');

let indexRoute = require('./routes/index'),
    whoamiRoute = require('./routes/whoami');

let app = module.exports = express();
app.use( bodyParser.json() );
app.use(cors());

app.use('/', indexRoute );
app.use('/api/whoami', whoamiRoute );


//port 8000
app.listen(8000, () => {
	console.log('App running at port 8000.');
});