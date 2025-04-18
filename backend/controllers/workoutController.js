
// Get all workouts owned by a certain user from db.
const get_workouts = (req,res) => {
    res.status(200).json({mssg:'get workouts'});
}

// Add workout owned by user from db.
const add_workout = (req,res) =>{
    res.status(200).json({mssg:'add workouts'});
}

// Delete a workout owned by a user from db.
const delete_workout = (req,res) => {
    res.status(200).json({mssg:'Delete workout'});
}

module.exports = {get_workouts, add_workout, delete_workout};