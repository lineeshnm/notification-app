import React, { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../actions/auth';
import { withRouter } from 'react-router'
import { history } from './Header'
import { Button, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
    const [values, setValues] = useState({
        email: 'lineesh2009@gmail.com',
        password: '12345678@a',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });
    // const history = useHistory()

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        // console.log(isAuth())
        isAuth() && history.push("/");
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        history.push(`/`);
                    } else {
                        history.push(`/`);
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            <div className="container">
                <div className="mt-3">
                    <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>User's email address</Form.Label>
                        <Form.Control value={email} onChange={handleChange('email')} name="email" type="email" placeholder="Type your email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>User's password</Form.Label>
                        <Form.Control value={password} onChange={handleChange('password')} name="password" type="password" placeholder="Type your password" />
                    </Form.Group>
                    <Button type="submit" variant='primary'>Signin</Button>
                    </Form>
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    );
};

export default withRouter(SignIn);