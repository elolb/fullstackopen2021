const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const User = require("../models/user")

const shouldWork = {
    "username": "thisshouldwork",
    "name": "a name",
    "password" : "mostsecret"
}

const missingUsername = {
    "name" : "user",
    "password" : "secret" 
}
const missingPassword = {
    "name" : "userwithnoPass",
    "username" : "new"
}

const shortUsername = {
    "username": "ab",
    "name": "shorty",
    "password": "thisisgood"
}

const shortPassword = {
    "username": "abcd",
    "name": "shorty",
    "password": "op"
}

const duplicateUsername = {
    "username": "abcd",
    "name": "copycat",
    "password": "opc"
}

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe("new user creation restrictions", () => {
    test("can create new user with valid params", async () => {
        await api.post("/api/users")
                .send(shouldWork)
                .expect(201)
        const response = await api.get("/api/users")
        const contents = response.body.map(helper.getUserContents)
        expect(response.body).toHaveLength(helper.initialUsers.length+1)
        expect(contents).toContainEqual({"name": shouldWork.name, "username": shouldWork.username})
    })

    test("user with missing username does not get created", async () => {
        await api.post("/api/users")
                .send(missingUsername)
                .expect(400)
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
    test("user with missing password does not get created", async () => {
        await api.post("/api/users")
                .send(missingPassword)
                .expect(400)
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })

    test("user with username shorter than 3 char does not get created", async () => {
        await api.post("/api/users")
                .send(shortUsername)
                .expect(400)
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
    test("user with password shorter than 3 char does not get created", async () => {
        await api.post("/api/users")
                .send(shortPassword)
                .expect(400)
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
    test("user with non-unique username does not get created", async () => {
        await api.post("/api/users")
                .send(duplicateUsername)
                .expect(400)
        const response = await api.get("/api/users")
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})