const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { user1, user1Id, setupTestDatabase } = require('./fixtures/db')

beforeEach(setupTestDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Hitansh',
        email: 'shahhitansh629@gmail.com',
        password: 'demoPass'
    }).expect(201)

    //Assertions that the database was updated correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Hitansh',
            email: 'shahhitansh629@gmail.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('demoPass')

})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    }).expect(200)
    const user = await User.findById(user1Id)
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: user1.email,
        password: 'wrongPass'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(user1Id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

// test('Should upload avatar image', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization', `Bearer ${user1.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/profile-pic.jpg')
//         .expect(200)
//     const user = await User.findById(user1Id)
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })

// test('Should update valid user fields', async () => {
//     await request(app)
//         .patch('/users/me')
//         .set('Authorization', `Bearer ${user1.tokens[0].token}`)
//         .send({
//             name: 'demo2'
//         })
//         .expect(200)
//     const user = await User.findById(user1Id)
//     expect(user.name).toBe('demo2')
// })

// test('Should not update invalid user fields', async () => {
//     await request(app)
//         .patch('/users/me')
//         .set('Authorization', `Bearer ${user1.tokens[0].token}`)
//         .send({
//             location: 'demo2'
//         })
//         .expect(400)
// })
