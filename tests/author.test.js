const { expect } = require("chai");
const request = require("supertest");

const { Author } = require("../src/models");

const app = require("../src/app");

describe("/authors", () => {
  afterEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /authors", () => {
      it("creates a new author in the database", async () => {
        const response = await request(app).post("/authors").send({
          name: "Maribel",
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal("Maribel");
        expect(newAuthorRecord.name).to.equal("Maribel");
      });

      it("errors if name is null", async () => {
        const response = await request(app).post("/authors").send({
          name: null,
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newAuthorRecord).to.equal(null);
      });
    });
  });

  describe("with records in the database", () => {
    let authors;

    beforeEach(async () => {
      authors = await Promise.all([
        Author.create({
          name: "Maribel",
        }),
        Author.create({
          name: "Rosi",
        }),
        Author.create({
          name: "Chati",
        }),
      ]);
    });

    describe("GET /authors", () => {
      it("gets all authors records", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((author) => {
          const expected = authors.find((a) => a.id === author.id);

          expect(author.name).to.equal(expected.name);
        });
      });
    });

    describe("GET /authors/:id", () => {
      it("gets authors record by id", async () => {
        const author = authors[0];
        const response = await request(app).get(`/authors/${author.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(author.name);
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).get("/authors/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The author could not be found.");
      });
    });

    describe("PATCH /authors/:id", () => {
      it("updates authors name by id", async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({ name: "Nevermore" });
        const updatedAuthorRecord = await Author.findByPk(author.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedAuthorRecord.name).to.equal("Nevermore");
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app)
          .patch("/authors/12345")
          .send({ title: "HeyHo" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The author could not be found.");
      });
    });

    describe("DELETE /authors/:id", () => {
      it("deletes author record by id", async () => {
        const author = authors[0];
        const response = await request(app).delete(`/authors/${author.id}`);
        const deletedAuthor = await Author.findByPk(author.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedAuthor).to.equal(null);
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).delete("/authors/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The author could not be found.");
      });
    });
  });
});
