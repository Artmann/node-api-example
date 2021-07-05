import request from 'supertest';

import api from '../api';

describe('Create Movie', () => {

  it('requies a description.', async() => {

    const server = api.listen();

    const response = await request(server)
      .post(`/movies`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        name: 'My Movie',
        releaseYear: 2021
      }))
      .expect(400);

      expect(response.text).toEqual('description is required.');
  });

  it('requies a name.', async() => {

    const server = api.listen();

    const response = await request(server)
      .post(`/movies`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        description: 'A Movie',
        releaseYear: 2021
      }))
      .expect(400);

      expect(response.text).toEqual('name is required.');
  });

  it('requies a release year.', async() => {

    const server = api.listen();

    const response = await request(server)
      .post(`/movies`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        description: 'A Movie',
        name: 'My Movie'
      }))
      .expect(400);

      expect(response.text).toEqual('releaseYear is required.');
  });

  it('creates a movie', async() => {

    const server = api.listen();

    const response = await request(server)
      .post(`/movies`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        description: 'A Movie',
        name: 'My Movie',
        releaseYear: 2005
      }))
      .expect(200);

    expect(response.body).toEqual({
      movie: {
        createdAt: expect.any(Number),
        description: 'A Movie',
        id: expect.any(String),
        name: 'My Movie',
        releaseYear: 2005,
        updatedAt: null
      }
    });

  });

});
