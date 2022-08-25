import './App.css';
import React from 'react';
import { Login } from '../Login/Login'
import { Signup } from '../Signup/Signup'
import Header from '../Header/Header'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoginScreen: true
    }
  }

  toggleLoginSignup = () => {
    // console.log("toggle")
    this.setState({isLoginScreen: !this.state.isLoginScreen})
  }

  // componentDidUpdate() {
  //   console.log(this.state)
  // }

  render() {
    const {isLoginScreen} = this.state
    return (
      <> 
        <Header toggleLoginSignup={this.toggleLoginSignup} isLoginScreen={isLoginScreen}/>
        {isLoginScreen ? <Login/> : <Signup/>}
      </>
    
    );
  }
  
}

export default App;
