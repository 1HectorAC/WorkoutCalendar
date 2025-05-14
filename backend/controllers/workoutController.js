const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

// Get all workouts owned by a certain user from db.
const get_workouts = async (req,res) => {
    try{
        const user_id = req.user._id;
        const workouts = await Workout.find({user_id});
        res.status(200).json(workouts);
        
    }catch(err){
        console.log('Error trying to get workouts')
        res.status(400).json({error:err.message});
    }
    
}

// Add workout owned by user from db.
const add_workout = async (req,res) =>{
    const data = req.body;

    // Empty fields validation
    const emptyFields = [];
    if(!data.title)
        emptyFields.push('title');
    if(!data.reps)
        emptyFields.push('reps');
    if(!data.sets)
        emptyFields.push('sets');
    if(!data.weekday)
        emptyFields.push('weekday');
    if(!data.bodyPart)
        emptyFields.push('bodyPart');
    if(emptyFields.length > 0)
        return res.status(400).json({error:'Please fill out all fields.', emptyFields});

    try{
        const user_id = req.user._id;
        const workout = await Workout.create({...data, user_id});
        res.status(200).json(workout);
    } catch(err){
        console.log("Error Trying to add workout");
        res.status(400).json({errror:err.message});
    }
    
}

// Delete a workout owned by a user from db.
const delete_workout = async (req,res) => {
    console.log('running delete workout');
    const id = req.params.id;

    //validation of id check
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log('error deleting workout');
        res.status(404).json({error:'No such workout'});
    }

    const workout = await Workout.findOneAndDelete({_id:id});
    if(!workout){
        console.log('error deleting workout');
        res.status(404).json({error:'No such workout'});
    }

    res.status(200).json(workout);
}

module.exports = {get_workouts, add_workout, delete_workout};