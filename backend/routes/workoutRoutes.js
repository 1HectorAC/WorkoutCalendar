const express = require('express');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

// Route to get a users workouts
router.get('/workouts', workoutController.get_workouts);

// Route to add a workout
router.post('/workout', workoutController.add_workout);

// Route to delete a workout
router.delete('/workout/:id', workoutController.delete_workout);

module.exports = router;