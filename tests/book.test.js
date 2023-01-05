const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
            title: "The End",
            author: "C Marfil",
            genre: "YA Fiction",
            ISBN: "39393939"
          });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('The End');
        expect(newBookRecord.author).to.equal('C Marfil');
        expect(newBookRecord.genre).to.equal('YA Fiction');
        expect(newBookRecord.ISBN).to.equal('39393939');
      });
    });
  });
});