import './App.css';
import React from 'react';
import LandingPageBody from '../LandingPageBody/LandingPageBody';
import LandingPage from '../LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Videospage } from '../Videospage/Videospage';
import { Courses } from '../Courses/Courses';
import { Sidemenu } from '../Sidemenu/Sidemenu';
import { Loader } from '../Loader/Loader';


function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

class App extends React.Component {
constructor(props){
  super(props)
  this.state = {
    username: null,
    loggedIn: false,
    isLoading: false,
    token: getToken(),
    errorCode: null
  }
}

setToken = (token) => {
  this.setState({token: token})
  sessionStorage.setItem('token', JSON.stringify(token));
}

setErrorCode = (code) => {
  this.setState({errorCode: code})
}

logOut = () => {
  sessionStorage.clear()
  this.setState({token: undefined, loggedIn: false})
}

logIn = (email, password) => {
  this.setState({isLoading: true})
    fetch('http://localhost:5001/api/login', {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => {
      if (!response.ok) {
        this.setErrorCode(response.status)
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
      })
    .then((token) => {
      this.setState({isLoading: false})
      this.setToken(token)
      this.setState({loggedIn: true})
      this.setErrorCode(null)
    })
    .catch((error) => {
      this.setState({isLoading: false})
      this.setState({loggedIn: false})
      console.log(error)
    })
}

  render() {
    console.log(this.state)
    const {isLoading, errorCode, token} = this.state
    const logIn = this.logIn
    const logOut = this.logOut
    return (
       (!token ? (
       <LandingPageBody>
          <LandingPage errorCode={errorCode} isLoading={isLoading} logIn={logIn}/>
        </LandingPageBody>) :
      <BrowserRouter>
        <Sidemenu logOut={logOut}>
          <Routes>
            <Route path="/" element={<Videospage/>}/>
            <Route path="/videos" element={<Videospage/>}/>
            <Route path="/courses" element={<Courses/>}/>
          </Routes>
        </Sidemenu>
      </BrowserRouter>
        )
        
    );
  }
  
}

export default App;
