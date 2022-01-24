import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import {NavLink, Redirect} from 'react-router-dom'
import './loginSignupPage.css'
import axios from 'axios';
import {ServerURL} from '../../constant';

export class loginPage extends Component {
    state={
        email: "",
        password: "",
        userDetails: null, 
        redirect: null
    }

    onChangeHandler = (event) => {
        let type = event.target.type;
        let value = event.target.value;
        this.setState({[type] : value});
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post(`${ServerURL}/login`, { 
            email: this.state.email, 
            password: this.state.password
        },{
            "headers": {
                "Accept" : "application/json",
                "content-type": "application/json"
            },
            withCredentials : true 
        })
            .then(data => {
                console.log(data);
                if(!data.data.user) {
                    // set redirect to false
                } else {
                    this.setState({redirect: '/home', userDetails: data.data});
                }
            })
            .catch(error => {
                
            })
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to = {{
                pathname: this.state.redirect,
                state: this.state.userDetails
            }}  />
        }
        return (
                <div className="loginPage">
                    <div className="container">
                        <h2 className="YMDb">YMDb</h2>
                        <div className="loginForm">
                            <Form className="form" onSubmit = {this.onSubmitHandler}>
                                <h2 className="text-center mb-0">Login</h2>
                                <p className="text-center mb-4">We are glad you are back!!</p>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                    type="email" 
                                    required    
                                    placeholder="Enter email" 
                                    onChange={this.onChangeHandler}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    required
                                    placeholder="Password" 
                                    onChange={this.onChangeHandler}/>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="loginBtn mt-2">
                                    Login
                                </Button>
                                <p className="mt-2">Need an account? <NavLink to="/signup">Register</NavLink></p>
                            </Form>
                        </div>
                    </div>
                </div>
        )
    }
}

export default loginPage
