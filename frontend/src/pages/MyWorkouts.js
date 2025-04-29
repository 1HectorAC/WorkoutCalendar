import { useEffect, useState } from "react";

const MyWorkouts = () => {
    const [workouts, setWorkouts] = useState(null);

    // Form data fields.
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weekday, setWeekday] = useState('monday');
    const [bodyPart, setBodyPart] = useState('');

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);


    // Handle submit for adding a workout.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, reps, sets, weekday, bodyPart, user_id: 'abc123' };
        const response = await fetch('/api/workout/workout', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
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
            if (response.ok) {
                //setWorkouts(json);
                const predefinedCategories = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

                const grouped = predefinedCategories.reduce((acc, weekday) => {
                    acc[weekday] = json.filter(item => item.weekday === weekday);
                    return acc;
                }, {});

                setWorkouts(grouped);
            }
        }
        fetchWorkouts();
    }, []);

    // React component that creates a table for workout data.
    const WorkoutTable = (props) => {
        return (
            <div className="workoutPanel">
                <div className="row">
                    <div className="col-md-3">
                        <h5 style={{padding:'20px'}}>{props.title}</h5>
                    </div>
                    <div className="col-md-9">
                        <table className='workoutTable table table-striped table-sm'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Reps</th>
                                    <th>Sets</th>
                                    <th>Body Part</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.workoutData.map((w) => (
                                    <tr key={w.title}>
                                        <td >{w.title}</td>
                                        <td> {w.reps}</td>
                                        <td>{w.sets}</td>
                                        <td>{w.bodyPart}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>

        )
    }

    return (
        <div>
            <h1>My Workouts Page</h1>

            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h3>Add a Workout</h3>
                    <div className='row'>
                        <div className="col-md-2 offset-md-1">
                            <label>Title</label>
                            <input type='text' className={emptyFields.includes('title') ? 'errorTextBox' : 'form-control'} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="col-md-2">
                            <label>reps</label>
                            <input type='number' className={emptyFields.includes('reps') ? 'errorTextBox' : 'form-control'} value={reps} onChange={(e) => setReps(e.target.value)} />
                        </div>
                        <div className='col-md-2'>
                            <label>sets</label>
                            <input type='number' className={emptyFields.includes('sets') ? 'errorTextBox' : 'form-control'} value={sets} onChange={(e) => setSets(e.target.value)} />

                        </div>
                        <div className='col-md-2'>
                            <label>Day</label>
                            <select className="form-control" value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                                <option value='monday'>Monday</option>
                                <option value='tuesday'>Tuesday</option>
                                <option value='wednesday'>Wednesday</option>
                                <option value='thursday'>Thursday</option>
                                <option value='friday'>Friday</option>
                                <option value='saturday'>Saturday</option>
                                <option value='sunday'>Sunday</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <label>BodyPart</label>
                            <input className={emptyFields.includes('bodyPart') ? 'errorTextBox' : 'form-control'} type='text' value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} />

                        </div>
                    </div>
                    <br />
                    <button className="btn btn-primary">Submit</button>
                    {error && <div className="error">{error}</div>}
                </div>

            </form>
            <div>

                <hr />
                <h3>My Workouts Calender</h3>

                {workouts && <WorkoutTable workoutData={workouts.monday} title='Monday' />}

                {workouts && <WorkoutTable workoutData={workouts.tuesday} title='Tuesday' />}

                {workouts && <WorkoutTable workoutData={workouts.wednesday} title='Wednesday' />}

                {workouts && <WorkoutTable workoutData={workouts.thursday} title='Thursday' />}

                {workouts && <WorkoutTable workoutData={workouts.friday} title='Friday' />}

                {workouts && <WorkoutTable workoutData={workouts.saturday} title='Saturday' />}

                {workouts && <WorkoutTable workoutData={workouts.sunday} title='Sunday' />}
            </div>
        </div>
    )
};
export default MyWorkouts;