import { useState } from "react";

const MyWorkouts = () => {

    // form data fields
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weekday, setWeekday] = useState('monday');
    const [bodyPart, setBodyPart] = useState('');


    //test data
    const workouts = [
        { title: 'Push ups', reps: 10, sets: 2, weekday: 'monday', bodyPart: 'arms' },
        { title: 'Sit ups', reps: 20, sets: 2, weekday: 'monday', bodyPart: 'core' },
        { title: 'Curl ups', reps: 10, sets: 2, weekday: 'tuesday', bodyPart: 'arms' }
    ];

    // Handle submit for adding a workout
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <h1>My Workouts Page</h1>

            <hr />
            <form onSubmit={handleSubmit}>
                <h3>Add a Workout</h3>
                <label>Title</label>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <label>reps</label>
                <input type='number' value={reps} onChange={(e) => setReps(e.target.value)}></input>
                <label>sets</label>
                <input type='number' value={sets} onChange={(e) => setSets(e.target.value)}></input>
                <label>Day</label>
                <select value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                    <option value='monday'>Monday</option>
                    <option value='tuesday'>Tuesday</option>
                    <option value='wednesday'>Wednesday</option>
                    <option value='thursday'>Thursday</option>
                    <option value='friday'>Friday</option>
                    <option value='saturday'>Saturday</option>
                    <option value='sunday'>Sunday</option>
                </select>
                <label value={bodyPart} onChange={(e) => setBodyPart(e.target.value)}>Body Part</label>
                <input type='text'></input>
                <button>Submit</button>
            </form>
            <div>

                <hr />
                <h3>My Workouts Calender</h3>
                {workouts.map((w) => (
                    <div key='w.title'>
                        <p>{w.title} {w.reps}, {w.sets}, {w.weekday}, {w.bodyPart}</p>
                    </div>

                ))}
            </div>
        </div>
    )
};
export default MyWorkouts;