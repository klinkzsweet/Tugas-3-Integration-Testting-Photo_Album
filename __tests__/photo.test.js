const request = require("supertest")
const app = require("../app")
const { User, Photo } = require("../models")

const dataUser = {
    id: 1,
    username: "admin4",
    email: "admin8@gmail.com",
    password: "admin4"
}

const dataPhoto = {
    id: 1,
    title: "judul1",
    caption: "caption1",
    imagerr_url: "url1"
}


describe("POST /photos", () => {
    beforeAll(async () => {
        try {
            await User.create(dataUser)
            await Photo.create(dataPhoto)
        } catch (error) {
            console.log(error);
        }
    })


    it("Response Sukses", (done) => {
        request(app)
            .post("/users/login")
            .send({
                username: dataUser.username,
                email: dataUser.email,
                password: dataUser.password,
        })
            .expect(200)
            .end((err, res) => {
            if (err) done(err);
    
            const token = res.body.token;
            request(app)
                .post("/photos")
                .set("authorization", token)
                .send({
                    title: dataPhoto.title,
                    caption: dataPhoto.caption,
                    imager_url: dataPhoto.imager_url,
            })
              //execute
                .expect(201)
                .end((err, res) => {
                if (err) done(err);
    
                expect(res.body).toHaveProperty("title");
                expect(res.body).toHaveProperty("caption");
                expect(res.body).toHaveProperty("imager_url");
                expect(res.body.caption).toEqual("caption1");
                done();
            });
        });
    });
    
    it("Response error karena tidak menyertakan authentikasi", (done) => {
        request(app)
            .post("/photos")
            .send({
            title: dataPhoto.title,
            caption: dataPhoto.caption,
            imager_url: dataPhoto.imager_url,
            })

            .expect(401)
            .end((err, res) => {
            if (err) done(err);
    
            done();
        });
    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
})

describe("GET /photos", () => {
    let Token; 

    beforeAll(async () => {
        try {
            await User.create(dataUser);
            const login = await request(app)
                .post("/users/login")
                .send({
                    username: dataUser.username,
                    email: dataUser.email,
                    password: dataUser.password
                });

            Token = login.body.token;
        } catch (error) {
            console.log(error);
        }
    });


    it("Response Sukses", async () => {
        const response = await request(app)
            .get("/photos")
            .set("authorization", Token); 

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("Response error karena tidak menyertakan authentikasi", async () => {
        const response = await request(app)
            .get("/photos");

        expect(response.status).toBe(401);
    });

    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});


describe("GET /photos/:id", () => {
    let Token;
    let photoId; 

    beforeAll(async () => {
        try {
            await User.create(dataUser);
            const login = await request(app)
                .post("/users/login")
                .send({
                    username: dataUser.username,
                    email: dataUser.email,
                    password: dataUser.password
                });

            Token = login.body.token;

            const createPhotoResponse = await request(app)
                .post("/photos")
                .set("authorization", Token)
                .send({
                    title: dataPhoto.title,
                    caption: dataPhoto.caption,
                    imager_url: dataPhoto.imager_url
                });

            photoId = createPhotoResponse.body.id;
        } catch (error) {
            console.log(error);
        }
    });

    it("Response Sukses", async () => {
        const res = await request(app)
            .get(`/photos/${photoId}`)
            .set("authorization", Token);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("id", photoId);
        expect(res.body).toHaveProperty("title", dataPhoto.title);
        expect(res.body).toHaveProperty("caption", dataPhoto.caption);
    });

    it("Response error data not found", async () => {
        const idSalah = photoId + 1; 
        const res = await request(app)
            .get(`/photos/${idSalah}`)
            .set("authorization", Token);

        expect(res.status).toBe(404);
    });


    afterAll(async () => {
        try {
            await User.destroy({ where: {} });
            await Photo.destroy({ where: {} });
        } catch (error) {
            console.log(error);
        }
    });
});






















    
//     it("Response Sukses", (done) => {
//         request(app)
//         .post("/users/login")
        

//         .expect(200)
//         .end((err, res) => {
//             if(err) done(err)

//             const token = res.body.token
//             request(app)
//             .post("/photos")
//             .set("authorization", token)
//             .send({
//                 tittle: dataPhoto.title,
//                 caption: dataPhoto.caption,
//                 imagerr_url: dataPhoto.imagerr_url,
//                 UserId: dataPhoto.UserId
//             })

//             .expect(201)
//             .end((err, res) => {
//                 if(err) done(err)
//                 expect(res.body).toHaveProperty("id");
//                 expect(res.body).toHaveProperty("title");
//                 expect(res.body).toHaveProperty("caption");
//                 expect(res.body).toHaveProperty("imagerr_url");
//                 expect(res.body).toHaveProperty("UserId");
//                 expect(res.body.caption).toEqual("caption1");
//                 done()
//             })
//         })
//     })
//     afterAll(async () => {
//         try {
//             await User.destroy({ where: {}})
//             await Photo.destroy({ where: {}})
//         } catch (error) {
//             console.log(error);
//         }
//     })
// })

// describe("GET /photos", () => {
//     beforeAll(async () => {
//         try {
//             await User.create(dataUser)
//             await Photo.create(dataPhoto)
//         } catch (error) {
//             console.log(error);
//         }
//     })

//     it("Response Sukses", (done) => {
//         request(app)
//         .post("/users/login")
//         .send({
//             username: dataUser.username,
//             email: dataUser.email,
//             password: dataUser.password
//         })

//         .expect(200)
//         .end((err, res) => {
//             if(err) done(err)

//             const token = res.body.token
//             request(app)
//             .("/photos")
//             .set("authorization", token)
//             .send({
//                 tittle: dataPhoto.title,
//                 caption: dataPhoto.caption,
//                 imagerr_url: dataPhoto.imagerr_url,
//                 UserId: dataPhoto.UserId
//             })
//     })
