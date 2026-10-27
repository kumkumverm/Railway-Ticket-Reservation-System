// src/Components/auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });
    const [error, setError] = useState('');  
    const [success, setSuccess] = useState('');  
    const [loading, setLoading] = useState(false);  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {  
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const response = await authApi.signup(formData);
            
            if (response.success) {
                setSuccess('Registration successful! Redirecting...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(response.error || response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Network error. Please try again.');
        }
        setLoading(false);
    };
    
    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate('/login');
    };
    
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join us for a hassle-free journey!</p>
                
                {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
                {success && <div className="success-message" style={{color: 'green', marginBottom: '10px'}}>{success}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
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
                            placeholder="Create a password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            pattern="[0-9]{10}"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    
                    <div className="auth-divider">
                        <span>or</span>
                    </div>
                    
                        <p>Already have an account? <a href="#login" className="auth-link" onClick={handleLoginClick}>Sign In</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;