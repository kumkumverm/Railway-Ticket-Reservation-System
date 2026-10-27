// src/Components/auth/Login.jsx
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';  
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');  
    const [loading, setLoading] = useState(false);  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {  // ← CHANGE TO async
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await authApi.login(formData.email, formData.password);
            
            if (response.success) {
                alert('Login successful!');
                navigate(response.role === 'ADMIN' ? '/admin' : '/dashboard');
            } else {
                setError(response.error || response.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Network error. Please try again.');
        }
        setLoading(false);
    };
    
    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigate('/register');
    };
    
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login to Your Account</h2>
                <p className="auth-subtitle">Welcome back! Please enter your details.</p>
                
                {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="xyz@gmail.com"
                            required
                            disabled={loading}  
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter the password"
                            required
                            disabled={loading}  
                        />
                    </div>
                    <div className="form-options">
                        <label className='checkbox-label'>
                            <input type="checkbox" />Remember me
                        </label>
                        <a href="#forget" className="forget-link">Forget password</a>
                    </div>
                    <button type="Submit" className="auth-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'} 
                    </button>
                    <div className="auth-divider">
                        <span>or</span>
                    </div>
                        <p>Don't have an account <a href="#register" className="auth-link" onClick={handleRegisterClick}>Sign Up</a></p>
                </form>
            </div>
        </div>
    )
}
export default Login;