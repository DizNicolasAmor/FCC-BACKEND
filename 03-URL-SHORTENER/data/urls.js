
const	mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		urlSchema = new Schema({
			originalURL: String,
			shortURL: String
		});

const ModelClass = mongoose.model('urls', urlSchema);

module.exports = ModelClass;
