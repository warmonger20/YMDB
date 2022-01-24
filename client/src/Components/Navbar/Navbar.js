import React, {useState} from 'react';
import './Navbar.css'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {NavLink, Redirect} from 'react-router-dom';
import axios from 'axios';

const Navigation = props => {

    const [logOut, isLogOut] = useState(false);
    const [search, setSearch] = useState("");
    const [user , setUser] = useState(false);
    const [UserData, setUserData] = useState([]);

    const logoutHandler = (event) => {
        event.preventDefault(); 
        axios.get('http://localhost:5000/logout',{
            "headers": {
                "Accept" : "application/json",
                "content-type": "application/json"
            },
            withCredentials : true 
        })
        .then(data => isLogOut(true));
    }

    const onClickHandler = async (e) => {
        console.log(search)
        const username = {
            search
        }
        e.preventDefault();
        const data = await axios.post('http://localhost:5000/search' , username , {
            "headers": {
                "Accept" : "application/json",
                "content-type": "application/json"
            },
            withCredentials : true 
        })
        if(data.data.msg)
        {

        }
        else
        {
            const object = [...data.data.userData]
            console.log(typeof(data.data.userData))
            console.log(typeof(object))
            setUserData([...object])
            console.log(typeof(UserData))
            setUser(true);
        }
    }

    if(logOut) {
        return (<Redirect to = '/login'/>);
    }
    if(user)
    {
        const url = `/home/${search}`;
        return (<Redirect to = {{
            pathname: url,
            username: UserData
        }} />);
    }
    return (
    <div className="navigation">
        <Navbar bg="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand >YMDb</Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ml-auto">
                        {/* <Form inline>
                            <FormControl 
                            type="text" 
                            placeholder="Search" 
                            className="mr-sm-2" 
                            onChange={(event) => setSearch(event.target.value)}/>
                            <Nav.Link onClick={onClickHandler}>Search</Nav.Link>
                        </Form> */}
                        <NavDropdown className="" title="Category" id="basic-nav-dropdown">
                            <NavDropdown.Item href = '/movies' className="item">
                                <Nav.Link href = '/movies' className="dropdown-link">Movies</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href = '/tvshows'>
                                <Nav.Link href = '/tvshows' className="dropdown-link">TV Shows</Nav.Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item href = '/anime'>
                                <Nav.Link href = '/anime' className="dropdown-link"> Anime </Nav.Link>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link >
                            <NavLink to = '/home'>Home</NavLink>
                        </Nav.Link>
                        <Nav.Link >
                            <NavLink to = '/add'>Add</NavLink>
                        </Nav.Link>
                        <Nav.Link onClick = {logoutHandler} className="logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>

)}

export default Navigation;