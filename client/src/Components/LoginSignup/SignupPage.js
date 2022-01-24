import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import {NavLink, Redirect} from 'react-router-dom'
import './loginSignupPage.css'
import axios from 'axios';
import {ServerURL} from '../../constant';
export class SignupPage extends Component {
   state={
        username : "",
        email: "",
        password: "",
        redirect: null
    }

    onChangeHandler = (event) => {
        let type = event.target.name;
        let value = event.target.value;
        this.setState({[type] : value});
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post(`${ServerURL}/signup`, this.state, {
            "headers": {
                "Accept" : "application/json",
                "content-type": "application/json"
            },
            withCredentials : true 
        })
        .then(data => {
            console.log(data);
            if(!data.data.user) {
                console.log('if');
            } else {
                console.log('else');
                this.setState({redirect: '/home'});
            }
        })
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to = {{
                pathname: this.state.redirect
            }}/>
        }
        return (
            <div className="loginPage">
            <div className="container">
                <h2 className="YMDb">YMDb</h2>
                <div className="loginForm">
                    <Form className="form" onSubmit={(event) => this.onSubmitHandler(event)}>
                        <h2 className="text-center mb-0">SignUp</h2>
                        <p className="text-center mb-4">Create your account to get started!!</p>
                        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                            name="username" 
                            type="text" 
                            required
                            placeholder="Enter your Username" 
                            onChange={this.onChangeHandler}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                            name = "email"
                            type="email" 
                            required
                            placeholder="Enter email" 
                            onChange={this.onChangeHandler}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            name = "password"
                            type="password" 
                            required
                            placeholder="Password"
                            onChange={this.onChangeHandler}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="loginBtn mt-2">
                            SignUp
                        </Button>
                        <p className="mt-2">Already have an account? <NavLink to="/login">Login</NavLink></p>
                    </Form>
                </div>
            </div>
        </div>
        )
    }
}

export default SignupPage
