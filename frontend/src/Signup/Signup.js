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
    // Dummy api
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      this.setState({isLoading: false})
      this.setState({signUpSuccess: true})
      console.log(data)
    })
    .catch((error)=>{
      this.setState({isLoading: false})
      this.setState({signUpSuccess: false})
      console.log(error)
    })
    
  }

  
  render () {
    const {isLoading, signUpSuccess} = this.state
    const message = "Creating account..."
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
       { isLoading ? <Loader message={message}/> : (
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