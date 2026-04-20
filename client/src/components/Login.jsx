import { useEffect, useState } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const [userData, setUserData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('login')) {
            navigate('/');
        }
    }, [navigate]);   

    const handleLogin = async () => {
        if (!userData.email || !userData.password) {
            alert("Please fill all fields");
            return;
        }

        let result = await fetch('http://localhost:3200/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'   // Fixed
            }
        });

        result = await result.json();

        if (result.success) {
            document.cookie = "token=" + result.token;
            localStorage.setItem('login', userData.email);
            window.dispatchEvent(new Event('localStorage-change'));
            navigate('/');
        } else {
            alert(result.message || "Invalid email or password");
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>

            <label>Email</label>
            <input 
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                type="email" 
                placeholder="Enter your email"
            />

            <label>Password</label>
            <input 
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                type="password" 
                placeholder="Enter your password"
            />

            <button onClick={handleLogin} className="submit">Login</button>
            <Link className='link' to="/signup">Don't have an account? Sign up</Link>
        </div>
    )
}