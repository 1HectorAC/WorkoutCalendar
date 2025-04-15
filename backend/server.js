require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.DBURI, {family:4})

console.log('Listening on port 4000...');
app.listen(4000);

app.use('/api/user', userRoutes);
app.use('/api/workout', workoutRoutes);

app.get('/', (req,res) => {
    res.status(200).json('{mssg:Request Success}');
})

