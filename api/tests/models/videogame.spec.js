const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if descriptiono is null', (done) => {
        Videogame.create({name: 'Mario'})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if descriptiono is null', (done) => {
        Videogame.create({name: 'Mario',description:'text'})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      
      it('should work when its a valid name, description and platform', () => {
        Videogame.create({ name: 'Super Mario Bros' , description:'text',platforms:'nintendo'});
      });
    });
  });
});
