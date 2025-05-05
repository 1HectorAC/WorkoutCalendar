const express = require('express');
const workoutController = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Check if authenticated before routes.
router.use(requireAuth);

// Route to get a users workouts
router.get('/workouts', workoutController.get_workouts);

// Route to add a workout
router.post('/workout', workoutController.add_workout);

// Route to delete a workout
router.delete('/workout/:id', workoutController.delete_workout);

module.exports = router;