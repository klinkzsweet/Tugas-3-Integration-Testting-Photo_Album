const request = require("supertest")
const app = require("../app")
const { User } = require("../models")

const dataUser = {
    username: "admin4",
    email: "admin8@gmail.com",
    password: "admin4"
}
describe("POST /users/register", () => {

    afterAll(async () => {
        try {
            await User.destroy({ where: {}})
        } catch (error) {
            console.log(error);
        }
    })

    it("Should be response 201", (done) => {
        request(app)
        .post("/users/register")
        .send({
            username: dataUser.username,
            email: dataUser.email,
            password: dataUser.password
        })
        .expect(201)
        .end((err, res) => {
            if (err) done(err)   
            
            expect(res.body).toHaveProperty("id")
            expect(res.body).toHaveProperty("username")
            expect(res.body).toHaveProperty("email")
            done()
        })
    })
})

describe("POST /users/login", () => {
    beforeAll(async () => {
        try {
            await User.create(dataUser)
        } catch (error) {
            console.log(error);
        }
    })

    it("Should be response 200", (done) => {
        request(app)
        .post("/users/login")
        .send({
            email: dataUser.email,
            password: dataUser.password
        })

        .expect(200)
        .end((err, res) => {
            if(err) done(err)

            expect(res.body).toHaveProperty("token")
            expect(typeof res.body.token).toEqual("string")
            done()
        })
    })

    it("Should be response 401", (done) => {
        request(app)
        .post("/users/login")
        .send({
            email: dataUser.email,
            password: "salah"
        })

        .expect(401)
        .end((err, res) => {
            if(err) done(err)

            expect(res.body).toHaveProperty("message")
            expect(res.body.message).toEqual("Incorrect password!")
            done()
        })
    })

    afterAll(async () => {
        try {
            await User.destroy({ where: {}})
        } catch (error) {
            console.log(error);
        }
    })
})