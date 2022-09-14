import './App.css';
import React from 'react';
import LandingPageBody from '../LandingPageBody/LandingPageBody';
import LandingPage from '../LandingPage/LandingPage';
import { Navigate, Routes, Route } from "react-router-dom";
import { Coursespage } from '../Coursespage/Coursespage';
import { Usercourses } from '../Usercourses/Usercourses';
import { Sidemenu } from '../Sidemenu/Sidemenu';
import { Videopage } from '../Videopage/Videopage';
import { AppContext, defaultUser } from './AppContext'
import { Addcourse } from '../Addcourse/Addcourse';
import {Buffer} from 'buffer';


class App extends React.Component {
constructor(props){
  super(props)
  this.state = {
    user: defaultUser,
    isLoading: false,
    errorCode: null
  }
}

componentDidMount() {
  const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      this.updateUser(foundUser);
    }
}

setErrorCode = (code) => {
  this.setState({errorCode: code})
}

updateUser = (currentUser) => {
  this.setState({user: currentUser})
}

resetUser = () => {
  this.setState({user: defaultUser})
  localStorage.clear();
}

logOut = () => {
    fetch(`https://producktiv-backend.onrender.com/api/logout?${document.cookie}`, {
      method: "DELETE",
      credentials: 'include',
    })
    .then((response) => {
      if (!response.ok) {
        this.resetUser()
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
      })
    .then((data) => {
      this.resetUser()
      document.cookie = ''
    })
    .catch((error) => {
      console.log(error)
    })
}

logIn = (email, password) => {
  this.setState({isLoading: true})
  const combo = `${email}:${password}`;
  const buffer = Buffer.from(combo).toString('base64');
  const basic = `Basic ${buffer}`;
    fetch('https://producktiv-backend.onrender.com/api/login',
    {
      method: "POST",
      credentials: "include",
      headers: {Authorization: basic}
    })
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        this.setErrorCode(response.status)
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
      })
    .then((data) => {
      this.setState({isLoading: false})
      this.updateUser(data.user)
      const d = new Date();
      d.setTime(d.getTime() + (1*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = "auth_key=" + data.user.token + ";" + expires + ";path=/";
      console.log(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      this.setErrorCode(null)
    })
    .catch((error) => {
      this.setState({isLoading: false})
      this.setState({user: defaultUser})
      console.log(error)
    })
}

  render() {
    const {isLoading, errorCode, user} = this.state
    const logIn = this.logIn
    const logOut = this.logOut
    const resetUser = this.resetUser
    return (
      (
        !user.token ? (
        <LandingPageBody>
          <Routes>
          <Route path="/login" element={<LandingPage errorCode={errorCode} isLoading={isLoading} logIn={logIn}/>}/>
          <Route path="*" element={<Navigate to="/login" replace/>}/>
          </Routes>
        </LandingPageBody>
        ) : (
          <AppContext.Provider value={{user, resetUser}}>
            <Sidemenu logOut={logOut}>
              <Routes>
                <Route path="/videos" element={<Coursespage/>}/>
                <Route path="/courses" element={<Usercourses/>}/>
                <Route path="/videoplay" element={<Videopage/>}/>
                <Route path="/add-course" element={<Addcourse/>}/>
                <Route path="*" element={<Navigate to="/videos" replace/>}/>
              </Routes>
            </Sidemenu>
          </AppContext.Provider>
        )
      )
    );
  }
}

export default App;
