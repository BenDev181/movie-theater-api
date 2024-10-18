const request = require("supertest");
const app = require("./src/app.js");
const { User, Show } = require("./models/index.js");

const seed = require("./db/seed.js");
let userRestQuantity;
let showRestQuantity;

beforeAll(async () => {
    await seed()
    const users = await User.findAll({});
    const shows = await Show.findAll({});
    userRestQuantity = users.length;
    showRestQuantity = shows.length;
});

test("Test for GET in /users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("username");
    expect(response.body.length).toEqual(userRestQuantity);
    expect(response.body).toContainEqual(
        expect.objectContaining({
            id: 1,
            username: "g.lucas@gmail.com",
            password: "mt4bwu"
        })
    );
});

