const request = require('supertest');
const app = require('../app');

let actorId
const BASE_URL = '/api/v1/actors'

const actor = {
    firstName: 'John',
    lastName: 'Smith',
    nationality: 'American',
    image: 'lorem',
}


//Test the actor Create
test("POST-> 'BASE_URL', should return status code 201, and res.body.firstName ===actor.firstName", async () => {

   
    
    const res = await request(app)
      .post(BASE_URL)
      .send(actor)
  
    actorId = res.body.id
    //console.log(actorId)
    //console.log(res.body)
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
  });

  //Test the actor Get all
  test("GET -> 'BASE_URL' should return status code 200 and res.body[0].firstName === actor.firstName", async () => {
    const res = await request(app)
      .get(BASE_URL)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].firstName).toBe(actor.firstName)
    expect(res.body).toHaveLength(1)
  })
  

  //Test the actor GetOne
  test("Get -> 'BASE_URL/:id', should return status code 200, return res.body.firstName === actor.firstName ", async () => {
  
    const res = await request(app)
      .get(`${BASE_URL}/${actorId}`)
  
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
  }) 
  
  //Test the actor Update
  test("PUT 'URL_BASE/:id' should return status code 200, and res.body.firstName === firstNameUpdate.firstName", async () => {
  
    const firstNameUpdate = {
      firstName: 'Pepe'
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${actorId}`)
      .send(firstNameUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(firstNameUpdate.firstName)
  })
  
  //Test the actor Delete
  test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${actorId}`)
  
    expect(res.status).toBe(204)
  }) 