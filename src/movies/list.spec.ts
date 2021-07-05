import request from 'supertest';

import api from '../api';
import { Movie } from '../../models/movie';

describe('List Movies', () => {

  it('lists all movies', async() => {

    const server = api.listen();

    const movie = await Movie.create({
      description: 'This is a Movie',
      name: 'My movie',
      releaseYear: 2003
    });

    const response = await request(server)
      .get('/movies')
      .expect(200);

    expect(response.body).toEqual({
      movies: [
        {
          createdAt: movie.createdAt,
          description: 'This is a Movie',
          id: movie.id,
          name: 'My movie',
          releaseYear: 2003,
          updatedAt: null
        }
      ]
    });

  });

});
