import express from 'express';
import {
   getPersonDetails
} from '../tmdb-api';
import personModel from './personModel.js';


const router = express.Router();

router.get('/', (req, res, next) => {
  personModel.find().then(p => res.status(200).send(p))
  .catch((error) => next(error));
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getPersonDetails(id).then(person => res.status(200).send(person)).catch(next);
});

router.post('/', async(req, res, next) => {
  if(!req.body.id || !req.body.name){
    res.status(401).json({
      success: false,
      msg: 'Please input the information of the person.',
    });
  }else{
    await personModel.create(req.body).catch(next);
    res.status(201).json({
      code: 201,
      msg: 'Successful created new person.',
    });
    }
})

router.put('/:id',  (req, res, next) => {
  if (req.body.id) delete req.body.id;
   personModel.update({
    id: req.params.id,
  }, req.body, {
    upsert: false,
  })
  .then(person => res.json(200, person)).catch(next);
});

router.delete('/:id', async(req, res, next) => {
  const id = parseInt(req.params.id);
  const person = await personModel.findByPersonId(id);
  if(!person){
    res.status(401).json({
      success: false,
      msg: 'Can not find the person.',
    });
  }else{
    await personModel.deleteByPersonId(id).catch(next);
    res.status(201).json({
      code: 201,
      msg: 'Successful delete a person.',
    });
  }
})



export default router;