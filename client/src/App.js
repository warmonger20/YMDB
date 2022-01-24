import React, {Component} from 'react';
import { Redirect, Route, Switch } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
// import Cards from './Components/Cards/Cards';
import AddPage from './Components/AddForm/AddForm';
import LoginPage from './Components/LoginSignup/loginPage';
import SignupPage from './Components/LoginSignup/SignupPage';
import HomePage from './Components/HomePage/homePage'
import DropDownPage from './Components/DropDownPages/dropDownPage';
import ProtectedRoute from './Components/ProtectedRoute'
// import SearchUser from './Components/SeachUser/SearchUser'
// import Form from './Containers/Form/Form';

class App extends Component {
  // state = {
  //   isLoggedIn : false
  // }

  render() {
  // let cookie = document.cookie.split(';');
  // let token = cookie.filter(x => {
  //   let indexOfx = x.indexOf("token");
  //   return (indexOfx!==-1)
  // })
  // let JSXRouting;
  // if(token.length===0)
  // {
  //     JSXRouting = (
  //       <Switch>
  //         <Route path = "/login" component={LoginPage}></Route>
  //         <Route path = "/signup" component={SignupPage}></Route>
  //         <Redirect to = "/login"></Redirect>
  //       </Switch>
  //     )
  // }
  // else
  // {
  //     JSXRouting = (
  //       <>
  //         <Navbar/>
  //         <Switch>
  //           <Route path = "/home" component={HomePage}></Route>
  //           <Route path = "/add"  component={AddPage}></Route>
  //           <Route path = "/movies" render={props => <DropDownPage type="movies" />}/>
  //           <Route path = "/tvshows" render={props => <DropDownPage type="tvshows" />}/>
  //           <Route path = "/anime" render={props => <DropDownPage type="anime" />}/>
  //         </Switch>
  //       </>
  //     )
  // }

    return (
        <>
        <Switch>
          <Route path = "/login" component={LoginPage}></Route>
          <Route path = "/signup" component={SignupPage}></Route>
          <ProtectedRoute  exact path = "/home" component={HomePage}/>
          <ProtectedRoute path = "/add"  component={AddPage}/>
          {/* <ProtectedRoute path = "/home/:id"  component={SearchUser}/> */}
          <ProtectedRoute path = "/movies" type="movies" component={DropDownPage} />
          <ProtectedRoute path = "/tvshows" component={DropDownPage} type="tvshows"/>
          <ProtectedRoute path = "/anime" component={DropDownPage} type="anime"/>
        </Switch>
        </>
    );
  }
}

export default App;
