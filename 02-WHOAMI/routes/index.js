const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	response.json({
		hello: 'Welcome to my whoami microservice',
		todo: 'Write /api/whoami at the end of the URL.',
		example: 'path/api/whoami',
    moreInfo: 'https://www.freecodecamp.org/challenges/request-header-parser-microservice'
	});
});

module.exports = router;