import chai from "chai";
import request from "supertest";
import api from "../../../../index";

const expect = chai.expect;

let token = "eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M";

const samplePerson = {
  id: 1245,
  name: "Scarlett Johansson"
};

describe("Person endpoint", function (){
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
  describe("GET /person", () => {
    it("should return 20 people and a status 200", (done) => {
      request(api)
        .get("/api/person")
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

  describe("GET /person/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        return request(api)
          .get(`/api/person/${samplePerson.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("name", samplePerson.name);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return an empty array", () => {
        return request(api)
          .get(`/api/person/0000000`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect({
            success: false,
            status_code: 34,
            status_message: 'The resource you requested could not be found.'
          });
      });
    });
  });

  describe("POST / ", () => {
    it("should return a 200 status and the confirmation message", () => {
      return request(api)
        .post("/api/person")
        .send({
          id: "20091635",
          name: "yuxin",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Successful created new person.' });
    });
    after(() => {
      return request(api)
        .get("/api/person")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(21);
        });
    });
  });
  describe("DELETE /person/:id", () => {
    it("should return a 201 status and the confirmation message", () => {
      return request(api)
        .delete(`/api/person/${samplePerson.id}`)
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(201)
        .expect({ code: 201, msg: 'Successful delete a person.' });
    });
    after(() => {
      return request(api)
        .get("/api/person")
        .set("Accept", "application/json")
        .set("Authorization", token)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
        });
    });
  });


});
