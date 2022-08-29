import React from 'react'
import './Login.css'

export class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value})
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value})
  }

  handleLoginSubmit = (event) => {
    console.log(this.state)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleLoginSubmit}>
      <div className="login-box">
        <div className="login-heading">
          <h1>LOGIN</h1>
          <p>Log in to your Productiv account.</p>
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
          <div class="error"><p>Wrong email or password.</p></div>
          <div className="submit-btn">
            <input type="submit" id="submit" value="Log In"/>
          </div>
        </div>  
      </div>
      </form>
    )
  }
}