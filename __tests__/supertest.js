const { response } = require("express");
const request = require("supertest");
const server = "http://localhost:3000";

describe("Route integration", () => {
  describe("/", () => {
    describe("GET", () => {
      it("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200);
      });
    });
  });

  describe("/signup", () => {
    // TO-DO: Check that the request body should have the format below
    describe("POST", () => {
      it("responds with 200 status and application/json content type upon successful signup", () => {
        return request(server)
          .post("/signup")
          .send({ username: "arbitraryDragonite", password: "str0ngHyperbe@m" })
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });

      xit("responds with an object in res.locals.user upon successful signup", () => {
        return request(server)
          .post("/signup")
          .send({ username: "arbitraryDragonite", password: "str0ngHyperbe@m" })
          .then((response) => {
            expect(
              response.locals.user.toEqual({
                username: "arbitraryDragonite",
                password: "str0ngHyperbe@m",
              })
            );
          });
      });
    });
  });

  // TO-DO: Should this redirect to OAuth?
  // describe('/login', () => {

  // });

  // TO-DO: Test redirection to /dashboard upon successful login

  describe("/logout", () => {
    describe("GET", () => {
      it("redirects users to the homepage", () => {
        return request(server)
          .get("/logout")
          .expect("Location", '/');
      });
    });
  });

  describe("/dashboard", () => {
    describe("GET", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/dashboard")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
    });

    // TO-DO: What should job application object look like?
    xdescribe("POST", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/dashboard")
          .send({
            // job application object
          })
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
    });
    
  });

  describe("/:jobAppId", () => {
    describe("DELETE", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .delete("/1")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
    });

    xdescribe("PUT", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .put("/1")
          .send({
            // job application object
          })
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });
    });
  });

  describe("page not found", () => {
    it("responds with 404 status", () => {
      return request(server)
        .get('/*')
        .expect(404);
    });
  });
});
