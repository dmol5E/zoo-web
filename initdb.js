var mongoose = require('mongoose');
var passport = require('passport');
var LocalStategy = require('passport-local').Strategy;
var Keeper = require('./models/Keeper');
var Animal = require('./models/Animal');
var User = require('./models/User');

// Passport config
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var users = [{
	username: 'dmle',
	first_name: 'Lee',
	name: 'Dmitrii',
	password: '12345',
	role: 'Keeper'
}, {
	username: 'jhro',
	first_name: 'Rogers',
	name: 'Jhon',
	password: '12345',
	role: 'Keeper'
}, {
	username: 'wimo',
	first_name: 'Montgomery',
	name: 'William',
	password: '12345',
	role: 'Keeper'
}, {
	username: 'zoologist',
	first_name: 'Someone',
	name: 'Somebody',
	password: '54321',
	role: 'Zoologist'
}];

var animals = [{
	name: 'Алекс',
	species: 'Лев',
	age: 5,
	cage: '#1',
}, {
	name: 'Глория',
	species: 'Бегемот',
	age: 4,
	cage: '#1',
}, {
	name: 'Мелман',
	species: 'Жираф',
	age: 1,
	cage: '#2',
}, {
	name: 'Мартин',
	species: 'Зебра',
	age: 2,
	cage: '#3',
}, {
	name: 'Шкипер',
	species: 'Пингвин',
	age: 1,
	cage: '#4',
}, ];

var createUser = function(userData) {
	return new Promise(function(resolve, reject) {
		User.remove({
			username: userData.username
		}, function(err) {});

		User.register(new User({
			username: userData.username,
			first_name: userData.first_name,
			name: userData.name,
			role: userData.role
		}), userData.password, function(err, user) {
			if (err) {
				reject(err);
			} else {
				resolve(user);
			}
		});
	});
};

var usersInit = function(Users) {
	var createUsers = function() {
		var promises = [];
		Users.forEach(function(userData) {
			promises.push(createUser(userData));
		});
		return promises;
	};

	return Promise.all(createUsers());
};

var animalsInit = function(Animals, Users) {
	Users.splice(Users.length - 1, 1);
	Animal.remove({}, function(err) {});
	Animals.forEach(function(animal) {
		var randomUser = Users[Math.floor(Math.random() * Users.length)];
		animal.keeper = randomUser;
	});
	return Animal.insertMany(Animals);
};


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/zoo')
	.then(() => {
		console.log('Connection to MongoDB succesful.');
		Promise.resolve()
			.then(function() {
				console.log('Init users');
				return usersInit(users);
			})
			.catch(function(err) {
				console.error(err);
			})
			.then(function(Users) {
				console.log('Init animals');
				return animalsInit(animals, Users);
			})
			.catch(function(err) {
				console.error(err);
			})
			.then(function() {
				mongoose.connection.close();
			});
	})
	.catch((err) => console.error(err));