import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// React component that creates a table for workout data.
const WorkoutTable = (props) => {
    return (
        <div className="workoutPanel">
            <div className="row">
                <div className="col-md-3">
                    <h5 style={{ padding: '20px' }}>{props.title}</h5>
                </div>
                <div className="col-md-9">
                    <table className='workoutTable table table-striped table-sm'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Reps</th>
                                <th>Sets</th>
                                <th>Body Part</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.workoutData.map((w) => (
                                <tr key={w._id}>
                                    <td>{w.title}</td>
                                    <td>{w.reps}</td>
                                    <td>{w.sets}</td>
                                    <td>{w.bodyPart}</td>
                                    <td><button className="btn btn-primary" onClick={() => props.handleDeleteSubmit(w._id, w.weekday)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const MyWorkouts = () => {
    const [workouts, setWorkouts] = useState(null);
    const {user} = useAuthContext();

    // Form data fields.
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weekday, setWeekday] = useState('monday');
    const [bodyPart, setBodyPart] = useState('');

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const [submitCount, setSubmitCount] = useState(0);

    // Handle submit for adding a workout.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            setError('You must be logged in');
            return;
        }
        const workout = { title, reps, sets, weekday, bodyPart};
        const response = await fetch('/api/workout/workout', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
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
  
            // submit count used as dependency var in useEffect.
            setSubmitCount(submitCount + 1);
        }
    }

    // Handle delete of workouts.
    const handleDeleteSubmit = async (id, weekday) => {
        if(!user){
            setError('You must be logged in');
            return;
        }
        const response = await fetch('/api/workout/workout/' + id, {
            method: 'DELETE',
            headers:{'Authorization': `Bearer ${user.token}`}
        });
        //const json = await response.json();

        if (response.ok) {
            // Remove workout for local workouts state.
            let tempWorkouts = { ...workouts };
            tempWorkouts[weekday] = tempWorkouts[weekday].filter(i => i._id !== id);
            setWorkouts(tempWorkouts);
        }
    };

    // Setup getting workouts in useEffect.
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workout/workouts', {
                headers:{'Authorization': `Bearer ${user.token}`}
            });
            const json = await response.json();
            if (response.ok) {
                //setWorkouts(json);
                const predefinedCategories = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

                let grouped = predefinedCategories.reduce((acc, weekday) => {
                    acc[weekday] = json.filter(item => item.weekday === weekday);
                    return acc;
                }, {});

                setWorkouts(grouped);
            }
        }

        // check if logged in before getting workouts
        if(user)
            fetchWorkouts();

    }, [user,submitCount]);

    return (
        <div>
            <div className="headerPanel">
                <h1>My Workouts Page</h1>
            </div>
            <hr />

            <form onSubmit={handleSubmit} className="formPanel">
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

                {workouts && <WorkoutTable workoutData={workouts.monday} title='Monday' handleDeleteSubmit={handleDeleteSubmit} />}

                {workouts && <WorkoutTable workoutData={workouts.tuesday} title='Tuesday' handleDeleteSubmit={handleDeleteSubmit} />}

                {workouts && <WorkoutTable workoutData={workouts.wednesday} title='Wednesday' handleDeleteSubmit={handleDeleteSubmit} />}

                {workouts && <WorkoutTable workoutData={workouts.thursday} title='Thursday' handleDeleteSubmit={handleDeleteSubmit} />}

                {workouts && <WorkoutTable workoutData={workouts.friday} title='Friday' handleDeleteSubmit={handleDeleteSubmit} />}

                {workouts && <WorkoutTable workoutData={workouts.saturday} title='Saturday' handleDeleteSubmit={handleDeleteSubmit} />}

                {workouts && <WorkoutTable workoutData={workouts.sunday} title='Sunday' handleDeleteSubmit={handleDeleteSubmit} />}

            </div>
        </div>
    )
};
export default MyWorkouts;