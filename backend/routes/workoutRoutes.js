const express = require('express')

const router = express.Router();

router.get('/workouts', (req,res) => {
    res.status(200).json('{mssg:Get All workouts}');
})


module.exports = router;