const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;
const routes = require('./exercise/routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.listen(port, () => {
	console.log('Your app is listening on port ' + port);
});
