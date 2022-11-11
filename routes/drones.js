const express = require('express');
const router = express.Router();

const Drone = require('../models/Drone.model')



router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  //res.send('HOLIHOLI')
  Drone
    .find()
    .then(dronesFromDB => {
      res.render('drones/list', { drone: dronesFromDB })
    })
    .catch(err => console.log(err))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params

  Drone
    .findById(id)
    .then(drone => {
      res.render('drones/update-form', drone)
    })
    .catch(err => console.log(err))

});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body

  Drone
    .create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones')
    })
    .catch(err => console.log(err))
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params
  const { name, propellers, maxSpeed } = req.body
  Drone
    .findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => res.redirect('/drones'))
    .catch(err => console.log(err))
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params

  Drone
    .findByIdAndDelete(id)
    .then(() => res.redirect('/drones'))
    .catch(err => console.log(err))

});

module.exports = router;
