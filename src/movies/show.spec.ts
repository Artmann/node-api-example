import request from 'supertest';

import api from '../api';
import { Movie } from '../../models/movie';

describe('Show Movie', () => {

  it('shows a movie', async() => {

    const server = api.listen();

    const movie = await Movie.create({
      description: 'This is a Movie',
      name: 'My movie',
      releaseYear: 2003
    });

    const response = await request(server)
      .get(`/movies/${ movie.id }`)
      .expect(200);

    expect(response.body).toEqual({
      movie: {
        createdAt: movie.createdAt,
        description: 'This is a Movie',
        id: movie.id,
        name: 'My movie',
        releaseYear: 2003,
        updatedAt: null
      }
    });

  });

  it('returns a 404 for non existing movies.', async() => {

    const server = api.listen();

    await request(server)
      .get(`/movies/123`)
      .expect(404);

  });

});
