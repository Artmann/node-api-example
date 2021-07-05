import { Context } from 'koa';

import { Movie } from '../../models/movie';

interface CreateMovieArguments {
  description?: string;
  name?: string;
  releaseYear?: number;
}

export async function createMovieRoute(context: Context): Promise<void> {
  const { description, name, releaseYear } = context.request.body as CreateMovieArguments;

  if (!description) {
    context.throw(400, 'description is required.');
  }
  if (!name) {
    context.throw(400, 'name is required.');
  }
  if (!releaseYear) {
    context.throw(400, 'releaseYear is required.');
  }

  const movie = await Movie.create({
    description,
    name,
    releaseYear
  });

  context.body = {
    movie
  };
}

export async function deleteMovieRoute(context: Context): Promise<void> {
  const { id } = context['params'];

  if (!id) {
    context.throw(404, 'Not Found.');
  }

  const movie = await Movie.find(id);

  if (!movie) {
    context.throw(404, 'Not Found.');
  }

  await movie.delete();

  context.status = 200;
}

export async function listMoviesRoute(context: Context): Promise<void> {
  const movies = await Movie.all();

  context.body = {
    movies
  };
}

export async function showMovieRoute(context: Context): Promise<void> {
  const { id } = context['params'];

  if (!id) {
    context.throw(404, 'Not Found.');
  }

  const movie = await Movie.find(id);

  if (!movie) {
    context.throw(404, 'Not Found.');
  }

  context.body = {
    movie
  };
}

interface UpdateMovieArguments {
  description?: string;
  name?: string;
  releaseYear?: number;
}

export async function updateMovieRoute(context: Context): Promise<void> {
  const { id } = context['params'];

  if (!id) {
    context.throw(404, 'Not Found.');
  }

  const movie = await Movie.find(id);

  if (!movie) {
    context.throw(404, 'Not Found.');
  }

  const { description, name, releaseYear } = context.request.body as UpdateMovieArguments;

  if (description) {
    movie.description = description;
  }

  if (name) {
    movie.name = name;
  }

  if (releaseYear) {
    movie.releaseYear = releaseYear;
  }

  await movie.save();

  context.body = {
    movie
  };
}
