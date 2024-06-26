const request = require('supertest');
const app = require('../app');

let genreId
const BASE_URL = '/api/v1/genres'

const genre = {
    name: "Action"
}


//Test the genre Create
test("POST-> 'BASE_URL', should return status code 201, and res.body.name === genre.name", async () => {
   
    const res = await request(app)
      .post(BASE_URL)
      .send(genre)
  
    genreId = res.body.id
  
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
  });

  //Test the genre Get All
  test("GET -> 'BASE_URL' should return status code 200 and res.body[0].firstName === genre.name", async () => {
    const res = await request(app)
      .get(BASE_URL)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(genre.name)
    expect(res.body).toHaveLength(1)
  })

  //Test the genre Get One
  test("Get -> 'BASE_URL/:id', should return status code 200, return res.body.firstName === genre.name ", async () => {
  
    const res = await request(app)
      .get(`${BASE_URL}/${genreId}`)
  
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
  }) 
  
  //Test the genre Update
  test("PUT 'URL_BASE/:id' should return status code 200, and res.body.name === nameUpdate.name", async () => {
  
    const nameUpdate = {
      name: 'Romance'
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${genreId}`)
      .send(nameUpdate)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(nameUpdate.name)
  })
  

  //Test the genre Delete
  test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${genreId}`)
  
    expect(res.status).toBe(204)
  }) 