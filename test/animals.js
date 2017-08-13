process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Animal = require('../models/Animal.js');
var User = require('../models/User.js');

var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiThings = require('chai-things');
var app = require('../app');
var expect = chai.expect;
var should = chai.should();
const {readFileSync} = require('fs');

chai.use(chaiHttp);
chai.use(chaiThings);

var agent = chai.request.agent(app);

describe('Animals', function() {

	before(function(done) {

		agent
			.post('/login')
			.send({
				username: 'testZoologist',
				password: '54321'
			})
			.then(function(res) {
				return agent.get('/animals')
					.then(function(res) {
						expect(res).to.have.status(200);
						done();
					});
			})
			.catch(function(err) {
				done(err);
			});
	});

	beforeEach(function(done) {
		Animal.remove({}, function (err) {
			done();
		});
	});

	describe('/GET animal', function() {
		it('GET all the animals', function(done) {
			agent
				.get('/animals')
				.end(function (err, res) {
					expect(res).status(200);
					expect(res.body).be.a('array');
					expect(res.body.length).be.eql(0);
					done();
				});
		});
	});

	describe('/POST animal', function() {
		it('POST animal', function(done) {
			var animal = {
				name: "TestAnimal",
				species: "Лев",
				age: 4,
				cage: "#10",
			};

			agent
				.post('/animals')
				.send(animal)
				.end(function(err, res) {
					expect(res).status(200);
					expect(res.body).be.a('object');
					expect(res.body).have.property('_id');
					expect(res.body).have.property('name');
					expect(res.body).have.property('species');
					expect(res.body).have.property('age');
					expect(res.body).have.property('cage');
					done();
				});
		});
	});

	describe('/GET/:id animal', function() {
		it('GET animal by id', function(done) {
			var animal = new Animal({
				name: "Пумба",
				species: "Кабан",
				age: 1,
				cage: "#2"
			});
			animal.save(function(err, animal) {
				agent.get('/animals/' + animal.id)
				.send(animal)
				.end(function(err, res) {
					expect(res).have.status(200);
					expect(res).be.a('object');
					expect(res.body).have.property('name');
					expect(res.body).have.property('species');
					expect(res.body).have.property('age');
					expect(res.body).have.property('cage');
					expect(res.body).have.property('_id').eql(animal._id.toString());
					done();
				});
			});
		});
	});

	describe('/POST/import animal', function() {
		it('POST animals from JSON file', function(done) {
			agent.post('/animals/import')
			.attach("import", readFileSync(__dirname + "/animal.json"), "animal.json")
			.end(function(err, res) {
				expect(res).have.status(200);
				expect(res).be.a('object');
				expect(res.body.length).be.eql(1);
				expect(res.body).all.have.property('name');
				expect(res.body).all.have.property('species');
				expect(res.body).all.have.property('age');
				expect(res.body).all.have.property('cage');
				expect(res.body).all.have.property('keeper');
				done();
			});
		});
	});
});