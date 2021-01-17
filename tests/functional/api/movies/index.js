import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";

const sampleMovie = {
  id: 337401,
  title: "Mulan",
  genre_ids: [28,12,18,14],
  backdrop_path: "/qAKvUu2FSaDlnqznY4VOp5PmjIF.jpg"
};

describe("Movies endpoint", function (){
  this.timeout(6400);
  before((done) => {
    setTimeout(() => {
      done();
    },5000);
  });
  before((done) => {
    request(api)
      .post("/api/users")
      .send({
        "username": "user1",
        "password": "test1"
      })
      .end((err, res) => {
        token = res.body.token;
        console.log(token)
        done();
      });
  });

  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /movies", () => {
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });

  describe("GET /movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", sampleMovie.title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return an empty array", () => {
        return request(api)
          .get(`/api/movies/9999`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({});
      });
    });
  });

  describe("GET /movies/upcoming/:region", () => {
   describe("when the region is valid", () => {
    it("should return a status 200", (done) => {
      request(api)
        .get("/api/movies/upcoming/US")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          done();
        });
    });
  });
  describe("when the region is invalid", () => {
    it("should return an empty array", () => {
      return request(api)
        .get(`/api/movies/upcoming/...`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect([]);
    });
  });
});

  describe("GET /movies/popular/:page", () => {
    describe("when the page is valid", () => {
    it("should return 20 movies and a status 200", (done) => {
      request(api)
        .get("/api/movies/popular/1")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
  });
  describe("when the page is invalid", () => {
    it("should return an empty array", () => {
      return request(api)
        .get(`/api/movies/popular/...`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect({});
    });
  });
  });

  describe("GET /movies/:id/similar", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}/similar`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body[2]).to.have.property("genre_ids");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return an empty array", () => {
        return request(api)
          .get(`/api/movies/00000/similar`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({});
      });
    });
  });

  describe("GET /movies/:id/cast", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}/cast`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body[0]).to.have.property("gender");
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return an empty array", () => {
        return request(api)
          .get(`/api/movies/00000/cast`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({});
      });
    });
  });
  
  describe("GET /movies/:id/image", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/movies/${sampleMovie.id}/image`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body[0]).to.have.property("file_path", sampleMovie.backdrop_path);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return an empty array", () => {
        return request(api)
          .get(`/api/movies/00000/image`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({});
      });
    });
  });

  describe("POST /movies", () => {
    it("should return a 200 status and the confirmation message", () => {
      return request(api)
        .post("/api/movies")
        .set("Accept", "application/json")
        .expect("Authorization", token)
        .send({
          id: "10000000",
          title: "AI",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Successful created new movie.' });
    });
    after(() => {
      return request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .expect("Authorization", token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(result).to.have.property("id","100000000");
          expect(result).to.have.property("title","AI");
        });
    });
  });

  describe("DELETE /movies/:id", () => {
    it("should return a 200 status and the confirmation message", () => {
      return request(api)
        .get(`/api/movies/${sampleMovie.id}`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .delete(`/api/movies/${sampleMovie.id}`)
        .expect(200)
        .expect({ code: 200, msg: 'Successful delete a movie.' });
    });
    after(() => {
      return request(api)
        .get("/api/movies")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(19);
        });
    });
  });

});
