const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title:{type:String, required:true},
    reps:{type:Number, required:true},
    sets:{type:Number, required:true},
    weekday:{type:String, required:true},
    bodyPart:{type:String, required:true},
    user_id: {type:String, required:true}
})

module.exports = mongoose.model('Workout', workoutSchema);