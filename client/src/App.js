import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/register/auth/Login';
import Register from './components/register/auth/Register';
import store from './store.js'

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
