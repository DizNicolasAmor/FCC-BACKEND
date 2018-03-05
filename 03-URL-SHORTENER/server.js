
const 	express = require('express'),
		bodyParser = require('body-parser'),
		cors = require('cors'),
		Urls = require('./data/urls'),
		routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());


//show static content from dir 'public'
	//the index.html is here
app.use(express.static(__dirname + '/public'));

//routes
app.use('/', routes);


app.listen( process.env.PORT || 8000, () => {
	console.log('App running on PORT 8000');
});