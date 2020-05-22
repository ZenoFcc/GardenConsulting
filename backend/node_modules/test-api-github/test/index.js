const getUserData = require('./../index').getUserData;

const expect = require('chai').expect;

var nock = require('nock');

const mavarona = require('./responses/mavarona');

const url = 'https://api.github.com';

describe('test of data for different users of github', () => {
    beforeEach(() => {
        nock(url).get('/users/mavarona')
            .reply(200, mavarona)
    });
    it('get data of user "mavarona"', () => {
        return getUserData('mavarona').then(
            res => {
                // the response must be an object
                expect(typeof res).to.equal('object');
                // check if the user of the API is mavarona
                expect(res.login).to.equal('mavarona');
                // check if id of the user is numeric
                expect(typeof res.id).to.equal('number');
                // check if followers and following are numerics
                expect(typeof res.followers).to.equal('number');
                expect(typeof res.following).to.equal('number');
                // check if company is 'Conquistadores de lo inútil'
                expect(res.company).to.equal('Conquistadores de lo inútil');
            }
        )
    });
});