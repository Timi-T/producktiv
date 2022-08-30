import React from 'react'
import { Loader } from '../Loader/Loader'
import './Signup.css'

export class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      isLoading: false,
      signUpSuccess: null
    }
  }

  clearSignUpForm = () => {
    this.setState({username: "", email: "", password: "" })
  }

  handleChangeUsername = (event) => {
    this.setState({username: event.target.value})
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value})
  }

  handleChangePassword = (event) => {
    this.setState({password: event.target.value})
  }

  handleSignUpSubmit = (event) => {
    event.preventDefault()
    this.setState({isLoading: true})
    const {email, password, username} = this.state

    fetch('http://localhost:5001/api/users', {
      method: "POST",
      body: JSON.stringify({username, email, password}),
      headers: {'Content-Type': 'application/json'}

    })
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .then((data) => {
      this.setState({isLoading: false})
      this.setState({signUpSuccess: true})
      this.clearSignUpForm()
    })
    .catch((error)=>{
      this.setState({isLoading: false})
      this.setState({signUpSuccess: false})
      console.log(error)
    })
    
  }

  
  render () {
    const {isLoading, signUpSuccess} = this.state
    const loadingText = "Creating account..."
    const signUpSuccessText = () => {
      if (signUpSuccess === null) {
        return <p>Create your Productiv account</p>
      } else if (signUpSuccess === true){
        return <p style={{color:"green"}}>Account Created! Proceed to log in.</p>
      } else if (signUpSuccess === false){
        return <p style={{color:"red"}}>Sorry, an error occured! Try again. </p>
      }
    }
    return (
      <>
       { isLoading ? <Loader loadingText={loadingText}/> : (
      <form onSubmit={this.handleSignUpSubmit}>
       
      <div className="signup-box">
        <div className="signup-heading">
          <h1>SIGNUP</h1>
          {signUpSuccessText()}
        </div>
        <div className="signup-details">
          <div className="username-box">
            <label><span>Username:</span><br />
            <input type="text" id="username" placeholder="Tim" value={this.state.username} onChange={this.handleChangeUsername} required/>
            </label>
          </div>
          <div className="email-box">
            <label><span>Email:</span><br />
            <input type="email" id="sg-email" placeholder="example@duc.tiv" value={this.state.email} onChange={this.handleChangeEmail} required/>
            </label>
          </div>
          <div className="password-box">
            <label><span>Password:</span><br />
            <input type="password" id="sg-password" placeholder="password"  minLength="8" value={this.state.password} onChange={this.handleChangePassword} required/>
            </label>
          </div>
          <div className="submit-btn">
            <input type="submit" id="sg-submit" value="Sign Up"/>
          </div>
        </div>  
      </div>
      </form> )
      }
      </>
    )
  }
}