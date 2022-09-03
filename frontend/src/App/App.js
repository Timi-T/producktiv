import './App.css';
import React from 'react';
import LandingPageBody from '../LandingPageBody/LandingPageBody';
import LandingPage from '../LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Coursespage } from '../Coursespage/Coursespage';
import { Usercourses } from '../Usercourses/Usercourses';
import { Sidemenu } from '../Sidemenu/Sidemenu';
import { Videopage } from '../Videopage/Videopage';
import {AppContext, defaultUser } from './AppContext'


// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

class App extends React.Component {
constructor(props){
  super(props)
  this.state = {
    user: defaultUser,
    isLoading: false,
    errorCode: null
  }
}

setErrorCode = (code) => {
  this.setState({errorCode: code})
}

getVideoDetails = (videoData) => {
  console.log(videoData)
}

updateUser = (currentUser) => {
  this.setState({user: {...currentUser, isLoggedIn:true}})
}

resetUser = () => {
  this.setState({user: defaultUser})
}

logOut = () => {
    fetch('http://localhost:5001/api/logout', {
      method: "DELETE",
      credentials: 'include',
    })
    .then((response) => {
      if (!response.ok) {

        this.resetUser()
        // this.setToken(null)
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
      })
    .then((data) => {
      this.resetUser()
      // this.setState({token: undefined, loggedIn: false})
    })
    .catch((error) => {
      console.log(error)
    })
  
}

logIn = (email, password) => {
  this.setState({isLoading: true})
    fetch('http://localhost:5001/api/login', 
    {
      method: "POST",
      body: JSON.stringify({email, password}),
      credentials: "include",
      headers: {'Content-Type': 'application/json'}
    }
    )
    .then((response) => {
      if (!response.ok) {
        this.setErrorCode(response.status)
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
      })
    .then((data) => {
      this.setState({isLoading: false})
      this.updateUser(data.user)
      // this.setToken(token)
      this.setErrorCode(null)
    })
    .catch((error) => {
      this.setState({isLoading: false})
      this.setState({user: defaultUser})
      console.log(error)
    })
}

  render() {
    console.log(this.state.user)
    const {isLoading, errorCode, user} = this.state
    const logIn = this.logIn
    const logOut = this.logOut
    const resetUser = this.resetUser
    return (
       (!user.token ? (
       <LandingPageBody>
          <LandingPage errorCode={errorCode} isLoading={isLoading} logIn={logIn}/>
        </LandingPageBody>) :
      <AppContext.Provider value={{user, resetUser}}>
      <BrowserRouter>
        <Sidemenu logOut={logOut}>
          <Routes>
            <Route path="/" element={<Coursespage/>}/>
            <Route path="/videos" element={<Coursespage/>}/>
            <Route path="/courses" element={<Usercourses/>}/>
            <Route path="/videoplay" element={<Videopage/>}/>
          </Routes>
        </Sidemenu>
      </BrowserRouter>
      </AppContext.Provider>

        )
        
    );
  }
  
}

export default App;
