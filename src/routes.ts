import Router from 'koa-router';

import { createMovieRoute, deleteMovieRoute, listMoviesRoute, showMovieRoute, updateMovieRoute } from './movies';

export function setupRoutes(router: Router): void {

  router.get('/movies', listMoviesRoute);
  router.get('/movies/:id', showMovieRoute);
  router.post('/movies', createMovieRoute);
  router.delete('/movies/:id', deleteMovieRoute);
  router.patch('/movies/:id', updateMovieRoute);

}
