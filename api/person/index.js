import express from 'express';
import {
  getPopularPerson
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  getPopularPerson(req.body).then(p => res.status(200).send(p))
  .catch((error) => next(error));
});

export default router;