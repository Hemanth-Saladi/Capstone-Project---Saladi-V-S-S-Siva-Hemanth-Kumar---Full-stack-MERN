const chai = require("chai");
const request = require("supertest");
const app = require("../app");

const expect = chai.expect;

describe("Courses API", () => {
    it("should return all courses", async () => {
        const res = await request(app).get("/api/courses");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });

    it("should create a new course", async () => {
        const res = await request(app)
            .post("/api/courses")
            .send({
                name: "Node Advanced",
                duration: "8 weeks"
            });

        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal("Node Advanced");
        expect(res.body.duration).to.equal("8 weeks");
    });
});