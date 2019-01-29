const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer =  require('multer');
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static(__dirname + '/public'));

app.post('/api/fileanalyse', upload.single('file'), (req, res) => {
  if(!req.file || !req.file.size)
    res.send('You must submit a file.');
	else {
    const { size, originalname } = req.file;
    res.json({ originalname, size});
  }
});

app.listen(port, () => {
	console.log('Your app is listening on port ' + port);
});
