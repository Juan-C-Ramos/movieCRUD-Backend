const request = require('supertest');
const app = require('../app');

let directorId
const BASE_URL = '/api/v1/actors'

const director = {
    firstName: 'Roberto',
    lastName: 'Gomez',
    nationality: 'Mexican',
    image: 'lorem',
    birthday: '02-01-1998'
}


//Test the director Create
test("POST-> 'BASE_URL', should return status code 201, and res.body.firstName ===director.firstName", async () => {
   
    const res = await request(app)
      .post(BASE_URL)
      .send(director)
  
    directorId = res.body.id
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
  });

  //Test the director Get All
  test("GET -> 'BASE_URL' should return status code 200 and res.body[0].name === director.firstName", async () => {
    const res = await request(app)
      .get(BASE_URL)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].firstName).toBe(director.firstName)
    expect(res.body).toHaveLength(1)
  })
  

  //Test the director Get One
  test("Get -> 'BASE_URL/:id', should return status code 200, return res.body.firstName === director.firstName ", async () => {
  
    const res = await request(app)
      .get(`${BASE_URL}/${directorId}`)
  
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
  }) 
  
  //Test the director Update
  test("PUT 'URL_BASE/:id' should return status code 200, and res.body.firstName === firstNameUpdate.firstName", async () => {
  
    const firstNameUpdate = {
      firstName: 'Toreto'
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${directorId}`)
      .send(firstNameUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(firstNameUpdate.firstName)
  })
  

  //Test the director Delete
  test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${directorId}`)
  
    expect(res.status).toBe(204)
  }) 