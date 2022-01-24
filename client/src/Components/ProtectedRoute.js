import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {isLogin} from '../constant.js'
import Navbar from '../Components/Navbar/Navbar'

const ProtectedRoute = ({component: Component, ...rest}) => {
  console.log(rest);
      return (
        <Route 
          {...rest} 
          render={(props) => {
            console.log(props);
            console.log("in func ", rest)
            return (
              isLogin() ?
                (
                    <Component {...props} type={rest.type} />
                ) :
                <Redirect to='/login' />
            )
          }} 
        />
      )
  }

export default ProtectedRoute
