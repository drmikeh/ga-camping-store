'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var auth = require('../../auth/auth.service');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('GET /api/users/userId/cart', function() {
  before(function(done) {
    // Add a test user before testing
    user.save(function() {
      done();
    });
  });

  it('should respond with JSON array', function(done) {
    var token = auth.signToken(user._id, user.role);
    var req = request(app);
    console.log('req: ' + JSON.stringify(req));
    req
      .get('/api/users/' + user._id + '/cart/' + '?access_token=' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
