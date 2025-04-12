const express = require('express');

const workoutRoutes = require('./routes/workoutRoutes')

const app = express();

console.log('Listening on port 4000...')
app.listen(4000);

app.use('/api/workout', workoutRoutes)

app.get('/', (req,res) => {
    res.status(200).json('{mssg:Request Success}');
})

