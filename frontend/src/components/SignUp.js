import React, { useState, useEffect } from 'react';
import { history } from './Header'
import { withRouter } from 'react-router'
import { signup, isAuth } from '../actions/auth';
import { Button, Form } from 'react-bootstrap';

const SignUp = () => {
    const [values, setValues] = useState({
        name: 'Lineesh',
        email: 'lineesh2009@gmail.com',
        password: '12345678@a',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const { name, email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && history.push("/signin");
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        signup(user).then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
                history.push("/signin")
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <div className="container">
                <div className="mt-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>User Name</Form.Label>
                            <Form.Control value={name} onChange={handleChange('name')} name="name" type="text" placeholder="Type your name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>User's email</Form.Label>
                            <Form.Control value={email} onChange={handleChange('email')} name="email" type="email" placeholder="Type your email" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Choose a password</Form.Label>
                            <Form.Control value={password} onChange={handleChange('password')} name="password" type="password" placeholder="Type your password" />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary">Signup</Button>
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
            {showForm && signupForm()}
        </React.Fragment>
    );
};
    
export default withRouter(SignUp);