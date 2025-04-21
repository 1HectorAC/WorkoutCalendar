const Workout = require('../models/workoutModel');

// Get all workouts owned by a certain user from db.
const get_workouts = async (req,res) => {
    try{
       
        const workouts = await Workout.find({});
        res.status(200).json(workouts);
        
    }catch(err){
        console.log('Error trying to get workouts')
        res.status(400).json({error:err.message});
    }
    
}

// Add workout owned by user from db.
const add_workout = async (req,res) =>{
    const data = req.body;

    // add empty field validation

    try{
        const workout = await Workout.create({...data});
        res.status(200).json(workout);
    } catch(err){
        console.log("Error Trying to add workout");
        res.status(400).json({errror:err.message});
    }
    
}

// Delete a workout owned by a user from db.
const delete_workout = (req,res) => {
    res.status(200).json({mssg:'Delete workout'});
}

module.exports = {get_workouts, add_workout, delete_workout};