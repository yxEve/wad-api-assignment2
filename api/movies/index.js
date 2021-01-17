import express from 'express';
import {
   getMovieReviews, getUpcomingMovies, getPopularMovies, getNowPlayingMovies,
   getSimilarMovies, getRecommendations
} from '../tmdb-api';
import movieModel from './movieModel.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});


router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews))
  .catch((error) => next(error));
});

router.get('/upcoming/:page', (req, res, next) => {
  const page = parseInt(req.params.page);
  getUpcomingMovies(page)
  .then(movies => res.status(200).send(movies))
  .catch((error) => next(error));
});

router.get('/upcoming/:region', (req, res, next) => {
  const region = parseString(req.params.region);
  getUpcomingMovies(region)
  .then(movies => res.status(200).send(movies))
  .catch((error) => next(error));
});

router.get('/popular/:page', (req, res, next) => {
  const page = parseInt(req.params.page);
  getPopularMovies(page)
  .then(movies => res.status(200).send(movies))
  .catch((error) => next(error));
});

router.get('/now_playing/:page', (req, res, next) => {
  const page = parseInt(req.params.page);
  getNowPlayingMovies(page)
  .then(movies => res.status(200).send(movies))
  .catch((error) => next(error));
});

router.get('/:id/similar', (req, res, next) => {
  const id = parseInt(req.params.id);
  getSimilarMovies(id)
  .then(similar => res.status(200).send(similar))
  .catch((error) => next(error));
});

router.get('/:id/recommendations', (req, res, next) => {
  const id = parseInt(req.params.id);
  getRecommendations(id)
  .then(recommendations => res.status(200).send(recommendations))
  .catch((error) => next(error));
});

export default router;