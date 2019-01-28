const express = require('express');
const routes = express.Router();
const User = require('../models/user');
const Exercise = require('../models/exercise');

mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/exercise',
	{ useNewUrlParser: true },
	err => {
		if (err) return new Error(err);
	}
);

/* post user */
routes.post('/api/exercise/new-user/', (req, res) => {
	if (!req.body.username) res.send('Error in sended form data.');

	const username = req.body.username;
	const newUser = new User({ username });

	newUser.save((err, data) => {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000)
				res.send('User already exists. Try a different name.');
			else res.send('Error while saving user.');
		} else res.json(data);
	});
	return;
});

/* post exercise */
routes.post('/api/exercise/add', (req, res) => {
	if (!req.body.username || !req.body.description || !req.body.duration)
		res.send('Error in sended form data.');

	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = req.body.date === '' ? new Date() : Date.parse(date);

	if (isNaN(Date.parse(date)) === true) res.send('Invalid date.');
	else {
		User.findOne({ username }, (err, user) => {
			if (err) res.send('Error while searching for username. Try again.');
			else if (!user) res.send('Username not found.');
			else {
				const userId = user.id;
				const newExercise = new Exercise({
					userId,
					description,
					duration,
					date
				});

				newExercise.save((err, data) => {
					if (err) res.send('Error while saving exercise.');
					else res.json(data);
				});
			}
		});
	}
});

/* get exercise */
/* /api/exercise/log?username=pepe&from=2018-01-21&to=2020-01-22&limit=3 */
routes.get('/api/exercise/:log', (req, res) => {
	console.log(req.query);
	const { username, from, to, limit } = req.query;

	const areParamsInvalid = params => {
		const isUsernameInvalid = !params.username || params.username.length > 10;
		const isFromInvalid = !params.from || isNaN(Date.parse(params.from)) === true;
		const isToInvalid = !params.to || isNaN(Date.parse(params.to)) === true;
		const isLimitInvalid = !params.limit || isNaN(limit) === true || Number(limit) < 1;
		return isUsernameInvalid || isFromInvalid || isToInvalid || isLimitInvalid;
	};

	if (areParamsInvalid(req.query)) res.send('Invalid params.');
	else {
		User.findOne({ username }, (err, user) => {
			if (err) res.send('Error while searching for username. Try again.');
			else if (!user) res.send('Username not found.');
			else {
				const initDate = new Date(from);
				const finishDate = new Date(to);
				const formatedLimit = Number(limit);
				finishDate.setDate(finishDate.getDate() + 1);
				const currentQuery = {
					userId: user.id,
					date: { $gte: initDate, $lt: finishDate }
				};

				Exercise.find(currentQuery)
					.select('userId description duration date')
					.limit(formatedLimit)
					.exec((err, exercises) => {
						if (err) res.send('Error while searching. Try again.');
						else if (!user) res.send('Exercise not found.');
						else res.json(exercises);
					});
			}
		});
	}
});

module.exports = routes;
