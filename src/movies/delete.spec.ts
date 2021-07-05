import request from 'supertest';

import api from '../api';
import { Movie } from '../../models/movie';

describe('Delete Movie', () => {

  it('deletes a movie', async() => {

    const server = api.listen();

    const movie = await Movie.create({
      description: 'This is a Movie',
      name: 'My movie',
      releaseYear: 2003
    });

    await request(server)
      .delete(`/movies/${ movie.id }`)
      .expect(200);

  });

  it('returns a 404 for non existing movies.', async() => {

    const server = api.listen();

    await request(server)
      .delete(`/movies/123`)
      .expect(404);

  });

});
