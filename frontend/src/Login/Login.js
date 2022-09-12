import React from 'react'
import { Loader } from '../Loader/Loader'
import './Login.css'

export class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        email: "",
        password: "",
        isLoading: false,
        loginSuccess: null
    }
  }


  handleChangeEmail = (event) => {
    this.setState({email: event.target.value})
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value})
  }

  handleLoginSubmit = (event) => {
    event.preventDefault()
    this.props.logIn(this.state.email, this.state.password)
  }

  render() {
    // console.log(this.props)
    const {errorCode} = this.props
    const subTextPrompt = (errorCode) => {
      if (errorCode !== null) {
        if (errorCode === 401) {
          return <p style={{color:"red"}}>Invalid username or password</p>
        } else {
          return <p style={{color:"red"}}>Sorry, an error occured! Try again. </p>
        }
      } else {
        return <p>Log in to your Producktiv account</p>
      }
    }
    return (
      (this.props.isLoading ? <Loader loadingText={"Logging in..."}/> :
      <form onSubmit={this.handleLoginSubmit}>
      <div className="login-box">
        <div className="login-heading">
          <h1>LOGIN</h1>
          {subTextPrompt(errorCode)}
        </div>
        <div className="login-details">
          <div className="email-box">
            <label><span>Email:</span><br />
            <input type="email" id="email" placeholder="example@duc.tiv" value={this.state.email} onChange={this.handleChangeEmail} required/>
            </label>
          </div>
          <div className="password-box">
            <label><span>Password:</span><br />
            <input type="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleChangePassword} required/>
            </label>
          </div>
          <div className="submit-btn">
            <input type="submit" id="submit" value="Log In"/>
          </div>
        </div>  
      </div>
      </form>)
    )
  }
}