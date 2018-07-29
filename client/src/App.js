import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/register/auth/Login';
import Register from './components/register/auth/Register';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
