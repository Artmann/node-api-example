import request from 'supertest';
import { Movie } from '../../models/movie';

import api from '../api';

describe('Update Movie', () => {

  it('updates a movie', async() => {
    const server = api.listen();

    const movie = await Movie.create({
      description: `An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.`,
      name: 'The Godfather',
      releaseYear: 1972
    });

    const response = await request(server)
      .patch(`/movies/${ movie.id }`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        description: `The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.`,
        name: 'The Godfather: Part II',
        releaseYear: 1974
      }))
      .expect(200);

    expect(response.body).toEqual({
      movie: {
        createdAt: expect.any(Number),
        description: `The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.`,
        id: expect.any(String),
        name: 'The Godfather: Part II',
        releaseYear: 1974,
        updatedAt: expect.any(Number)
      }
    });

  });

  it('returns a 404 for non existing movies.', async() => {

    const server = api.listen();

    await request(server)
      .patch(`/movies/123`)
      .expect(404);

  });

});
