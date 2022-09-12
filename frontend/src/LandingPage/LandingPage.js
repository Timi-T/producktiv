import React from 'react';
import { ImGithub, ImLinkedin } from 'react-icons/im';
import { Login } from '../Login/Login';
import { Signup } from '../Signup/Signup';
import './LandingPage.css';


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
        <h1>Producktiv.</h1>
        <div className="app-summary">
          <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual 
          form of a document or a typeface without relying on meaningful content. 
          Lorem ipsum may be used as a placeholder before final copy is available.
          </p>
          <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual 
          form of a document or a typeface without relying on meaningful content. 
          Lorem ipsum may be used as a placeholder before final copy is available.
          </p>
        </div>
        <div className="team-info">
          <p>Built by:</p>
          <ul>
            <li><p>Opeyemi Ogunbode (Backend and DevOps)&nbsp;&nbsp;<a href="https://www.linkedin.com/in/opeyemi-ogunbode-33441814a/" target="_blank" rel="noreferrer"><ImLinkedin/></a>&nbsp;&nbsp;<a href="https://github.com/Timi-T" target="_blank" rel="noreferrer" ><ImGithub/></a></p></li>
            <li><p>Rihana Ali Saeid (Backend)&nbsp;&nbsp;<a href="https://www.linkedin.com/in/rihana-ali-saeid-68352b1bb/" target="_blank" rel="noreferrer" ><ImLinkedin/></a>&nbsp;&nbsp;<a href="https://github.com/avocadoclouds" target="_blank" rel="noreferrer" ><ImGithub/></a> </p></li>
            <li><p> Samra Solomon (Backend)&nbsp;&nbsp;<a href="https://www.linkedin.com/in/samra-solomon-24b745208/" target="_blank" rel="noreferrer" ><ImLinkedin/></a>&nbsp;&nbsp;<a href="https://github.com/samie-ya" target="_blank" rel="noreferrer" ><ImGithub/></a></p></li>
            <li><p>Tony Baidoo (Frontend)&nbsp;&nbsp;<a href="https://www.linkedin.com/in/tony-baidoo/" target="_blank" rel="noreferrer" ><ImLinkedin/></a>&nbsp;&nbsp;<a href="https://github.com/tcrz" target="_blank" rel="noreferrer" ><ImGithub/></a></p></li>
          </ul>
        </div>
        <div>
          <p><ImGithub/><a href="https://github.com/Timi-T/producktiv/" target="_blank" rel="noreferrer">&nbsp;Link to Github Repo</a></p>
        </div>
        
      </div>
      <div className="login-section">
        <div className="login-header">
          <p>{loginMsgText}&nbsp;
            <button onClick={()=>this.toggleLoginSignup()} className="login-toggle">{loginbtnText}</button>
          </p>
        </div>
      {isLoginScreen ? <Login errorCode={this.props.errorCode} isLoading={this.props.isLoading} logIn={this.props.logIn}/> : <Signup/>}
      </div>
      </>
    )
  }
}