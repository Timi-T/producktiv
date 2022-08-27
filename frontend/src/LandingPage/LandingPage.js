import React from 'react';
import { Login } from '../Login/Login';
import { Signup } from '../Signup/Signup';
import './LandingPage.css'

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoginScreen: true
    }
  }

  toggleLoginSignup = () => {
    this.setState({isLoginScreen: !this.state.isLoginScreen})
  }

  render () {
    const {isLoginScreen} = this.state
    const loginbtnText = isLoginScreen ? "Sign up now" : "Sign in"
    const loginMsgText =isLoginScreen ? "Not a member?" : "Already a member?"
    return(
      <>
      <div className="about-app">
      <h1></h1>
      </div>
      <div className="login-section">
        <div className="login-header">
          <p>{loginMsgText}&nbsp;
            <button onClick={()=>this.toggleLoginSignup()} className="login-toggle">{loginbtnText}</button>
          </p>
        </div>
      {isLoginScreen ? <Login/> : <Signup/>}
      </div>
      </>
    )
  }
}