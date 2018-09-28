const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(cors({ optionSuccessStatus: 200 }));

const indexRoute = require('./routes');
const whoamiRoute = require('./routes/whoami');

app.use('/', indexRoute );
app.use('/api/whoami', whoamiRoute );

app.listen(port, () => {
	console.log('Your app is listening on port ' + port);
});
