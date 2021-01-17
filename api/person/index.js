import express from 'express';
import {
  getPopularPerson, getPersonDetails
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  getPopularPerson(req.body).then(p => res.status(200).send(p))
  .catch((error) => next(error));
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getPersonDetails(id).then(person => res.status(200).send(person)).catch(next);
});

export default router;