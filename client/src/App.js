import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser,logoutUser} from './actions/authActions'
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/register/auth/Login';
import Register from './components/register/auth/Register';
import store from './store.js'

// check for token

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  // decode and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user
  store.dispatch(setCurrentUser(decoded));
  // check for expired token time
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // logout
    store.dispatch(logoutUser());
    // redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
     <Provider store = {store}>
        <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Route exact path = '/' component = {Landing}/>
            <div className="container">
              <Route exact path = '/register' component = {Register}/>
              <Route exact path = '/login' component = {Login}/>
            </div>
            <Footer/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
