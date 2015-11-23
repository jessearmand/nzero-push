/* eslint no-unused-expressions: 0 */

var ZeroPush = require('../lib/zero_push');
var expect = require('chai').expect;
var request = require('supertest');

var authToken = process.env.ZERO_PUSH_TOKEN || "test-token";

describe('ZeroPush module', function() {
  this.timeout(20000);

  it('should initialize ZeroPush', function(done) {
    expect(authToken).to.exist;

    var zeropush = new ZeroPush(authToken);
    expect(zeropush).to.exist;
    done();
  });

  describe('API methods', function() {
    var deviceToken = "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    var zeropush;

    beforeEach(function(done) {
      zeropush = new ZeroPush(authToken);
      expect(zeropush).to.exist;
      done();
    });

    it('should register a device token', function(done) {
      zeropush.register(deviceToken, [], function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should register device token to testing-channel', function(done) {
      zeropush.register(deviceToken, 'testing-channel', function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should set badge to a number', function(done) {
      zeropush.setBadge({ 'badge': 1, 'device_token': deviceToken }, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should reset badge to 0', function(done) {
      zeropush.setBadge({ 'badge': 0, 'device_token': deviceToken }, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should return inactive tokens', function(done) {
      zeropush.inactiveTokens({}, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should subscribe device token to testing-channel', function(done) {
      zeropush.subscribe({ 'channel': 'testing-channel', 'device_token': deviceToken }, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should unsubscribe device token from testing-channel', function(done) {
      zeropush.unsubscribe({ 'channel': 'testing-channel', 'device_token': deviceToken }, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should notify to device token', function(done) {
      zeropush.notify('ios-mac', {
        device_tokens: [deviceToken],
      },
      {
        alert: 'Hello, World',
        badge: '+1',
        sound: 'default'
      }, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should broadcast to everyone', function(done) {
      zeropush.broadcast('ios-mac', {}, {
        alert: 'Hello, World',
        badge: '+1',
        sound: 'default'
      }, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

    it('should broadcast to testing-channel', function(done) {
      zeropush.broadcast('ios-mac', { channel: 'testing-channel' }, {
        alert: 'Hello, World',
        badge: '+1',
        sound: 'default'
      }, function(error, responses) {
        expect(error).to.not.exist;
        expect(responses).to.exist;
        done();
      });
    });

  });

});

