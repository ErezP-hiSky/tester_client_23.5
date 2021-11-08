import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';

function Login(props) {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/dashboard');
        }

        if (error === 'Invalid Credentials (email)' || error === 'Invalid Credentials (password)') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user; 

    const onChange = e => setUser({ ...user,  [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'alert');
        } else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <h6>
                If you are new here, please {' '}
                <Link className="register-text" to="/register">
                    Register.
                </Link>                
            </h6>
            <form className="LoginForm" onSubmit={onSubmit}>
                <div className="form-group">
                     <label htmlFor="email"> Email Address</label>
                     <input type="email" name="email" placeholder="Enter email"
                        value={email} onChange={onChange}/>
                </div>
                <div className="form-group">
                     <label htmlFor="password"> Password</label>
                     <input type="password" name="password" placeholder="Enter password"
                        value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-block " />
            </form>
        </div>
    )
}

export default Login;