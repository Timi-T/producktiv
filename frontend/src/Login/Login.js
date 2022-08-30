import React from 'react'
import './Login.css'

export class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
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
    const {email, password} = this.state
    fetch('https://reqres.in/api/login', {
      method: "POST",
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((token) => {
      this.props.setToken(token)
    })
    .catch((error) => console.log(error))
    // console.log(this.state)
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