import { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }
    return (
        <div style={{ padding: '20px' }}>
            <div className='formStyling'>
                <form className='signup' onSubmit={handleSubmit}>
                    <h2>Signup</h2>
                    <hr />
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' id='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <br />
                    <button className='btn btn-primary' disabled={isLoading}>Submit</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        </div>



    );
};

export default Signup;