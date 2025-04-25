import { useEffect, useState } from "react";

const MyWorkouts = () => {
    const [workouts, setWorkouts] = useState(null);

    // Form data fields.
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weekday, setWeekday] = useState('monday');
    const [bodyPart, setBodyPart] = useState('');

    const [error,setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    

    // Handle submit for adding a workout.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {title, reps,sets,weekday,bodyPart,user_id:'abc123'};
        const response = await fetch('/api/workout/workout', {
            method:'POST',
            body: JSON.stringify(workout),
            headers:{'Content-Type':'application/json'}
        })
        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            // Clear fields.
            setTitle('');
            setReps('');
            setSets('');
            setWeekday('monday');
            setBodyPart('');
            setError(null);
            setEmptyFields([]);
        }
        

    }

    // Setup getting workouts in useEffect.
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workout/workouts');
            const json = await response.json();
            if(response.ok){
                setWorkouts(json);
            }
        }
        fetchWorkouts();
    },[]);

    return (
        <div>
            <h1>My Workouts Page</h1>

            <hr />
            <form onSubmit={handleSubmit}>
                <h3>Add a Workout</h3>
                <label>Title</label>
                <input type='text' className={emptyFields.includes('title')?'errorTextBox':''} value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>reps</label>
                <input type='number' className={emptyFields.includes('reps')?'errorTextBox':''} value={reps} onChange={(e) => setReps(e.target.value)} />
                <label>sets</label>
                <input type='number' className={emptyFields.includes('sets')?'errorTextBox':''} value={sets} onChange={(e) => setSets(e.target.value)} />
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
                <label>BodyPart</label>
                <input className={emptyFields.includes('bodyPart')?'errorTextBox':''} type='text' value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} />
                <button>Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
            <div>

                <hr />
                <h3>My Workouts Calender</h3>
                {workouts && workouts.map((w) => (
                    <div key={w.title}>
                        <h5>{w.title}</h5>
                        <p> {w.reps}, {w.sets}, {w.weekday}, {w.bodyPart}</p>
                    </div>

                ))}
            </div>
        </div>
    )
};
export default MyWorkouts;