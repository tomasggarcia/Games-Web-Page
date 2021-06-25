/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid')
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');


const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description:'Lorem ipsum',
  platforms:'nintendo',
  id:uuidv4()
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /genres', () => {
    it('should get 200', () =>
      agent.get('/genres').expect(200)
    );
  });
});
