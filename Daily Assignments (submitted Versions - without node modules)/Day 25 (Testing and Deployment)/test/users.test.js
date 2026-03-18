const chai = require("chai");
const request = require("supertest");
const app = require("../app");

const expect = chai.expect;

describe("Users API", () => {
    it("should return all users", async () => {
        const res = await request(app).get("/api/users");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });
});