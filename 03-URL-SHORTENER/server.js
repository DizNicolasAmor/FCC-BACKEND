const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;
const Urls = require('./data/urls');
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.use(cors({ optionSuccessStatus: 200 }));

// show static content
app.use(express.static(__dirname + '/public'));

// routes
app.use('/', routes);

app.listen(port, () => {
	console.log('Your app is listening on port ' + port);
});
