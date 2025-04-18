import {useState} from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }
    return (
        
            <form className='signup' onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button disabled={isLoading}>Submit</button>
                {error && <div className='error'>{error}</div>}
            </form>

    );
};

export default Signup;