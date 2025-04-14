import {useState} from 'react'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email,password);
    }
    return (
        
            <form className='login' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button>Submit</button>
            </form>

    );
};

export default Login;