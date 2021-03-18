const request = require('supertest');

const { setupStrapi } = require('./helpers/strapi');

jest.setTimeout(10000);

let app; // this is instance of the the strapi

beforeAll(async (done) => {
  app = await setupStrapi(); // return singleton so it can be called many times
  done();
});

it('should return pong', async done => {
  await request(app.server) // app server is an instance of Class: http.Server
    .get('/ping')
    .expect(200) // Expect response http code 200
    .then(data => {
      expect(data.text).toBe('pong'); // expect the response text
    });
  done();
});
