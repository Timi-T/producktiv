import React from 'react';
import { Login } from '../Login/Login';
import { Signup } from '../Signup/Signup';
import './LandingPage.css'
import img1 from './pro-pic1.jpg';
import img2 from './pro-pic2.jpg';
import img3 from './pro-pic3.jpg';
import ope from './ope.jpg';
import samra from './samra.jpg';
import blank from './blank.jpg';
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs"

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
      <div id='full-page'>
        <div id='top-page'>
          <div id='top-left'>
            <div className="about-app">
              <h2 className='landing-text'>Get producktiv today!</h2>
            </div>
            <img className='main-image' id='main-img1' src={img3} alt="img" />
            <h2 id='intro-text'>Get started today and begin to tap into your full potentials as you share knowledge and skills you are passionate about with fellow peers.</h2>

          </div>
          <div className="login-section">
            <div className="login-header">
              <p>{loginMsgText}&nbsp;
                <button onClick={()=>this.toggleLoginSignup()} className="login-toggle">{loginbtnText}</button>
              </p>
            </div>
            {isLoginScreen ? <Login errorCode={this.props.errorCode} isLoading={this.props.isLoading} logIn={this.props.logIn}/> : <Signup/>}
          </div>
        </div>
        <div id='bottom-page'>
          <img className='image' id='img1' src={img1} alt="img" />
          <h2 id='bottom-text'>Reinforce your knowledge and skills as you tutor others.</h2>
          <img className='image' id='img2' src={img2} alt="img" />
          <h2 id='bottom-text'> Build your weaknesses by learning from other tutors</h2>
        </div>
        <div id='about'>
          <h2 id='about-title'>about</h2>
          <h4 id='project-repo'>
            [ Project Repository : <div className='icon'><a href='https://github.com/Timi-T/producktiv/' target={'blank'}><BsGithub /></a></div> ]
          </h4>
          <p className='brief-desc'>
            The objective of Producktiv is to bring together people from different fields who would like to
            collaborate and share ideas with other people. This helps you as a tutor to get your content out
            there and as a student, to learn various skills without any cost to you.
          </p>
          <p className='brief-desc'>
            This project was built by a collaboration of young and bright minds from the ALX-Softtware Engineering program
            as a final protfolio project.
          </p>
          <h4 id='meet-team'>Meet the Team!</h4>
          <div id='developers'>
            <div className='person'>
              <div className='person-desc'>
                <img className='person-image' id='img2' src={ope} alt="img" />
                <h4 className='person-name'>Opeyemi</h4>
              </div>
              <p className='person-text'>
                  Opeyemi Software Engineer based in Lagos, Nigeria. He is responsible for parts of the backend, frontend and devops for this project.
              </p>
              <div className='contacts'>
                <div className='icon'><a href='https://github.com/Timi-T' target={'blank'}><BsGithub /></a></div>
                <div className='icon'><a href='https://www.linkedin.com/in/opeyemi-ogunbode-33441814a/' target={'blank'}><BsLinkedin /></a></div>
                <div className='icon'><a href='https://twitter.com/roadsidedev?t=bXZWtAMHdw_wjpzRrbC7Yw&s=31' target={'blank'}><BsTwitter /></a></div>
              </div>
            </div>
            <div className='person'>
              <div className='person-desc'>
                <img className='person-image' id='img2' src={samra} alt="img" />
                <h4 className='person-name'>Samra</h4>
              </div>
              <p className='person-text'>
                  Samra is a Software Engineer based in Addis Ababa, Ethiopia. She is responsible for the backend of this project.
              </p>
              <div className='contacts'>
                <div className='icon'><a href='https://github.com/samie-ya' target={'blank'}><BsGithub /></a></div>
                <div className='icon'><a href='https://www.linkedin.com/in/samra-solomon-24b745208' target={'blank'}><BsLinkedin /></a></div>
                <div className='icon'><a href='https://twitter.com/Samie67514029' target={'blank'}><BsTwitter /></a></div>
              </div>
            </div>
            <div className='person'>
              <div className='person-desc'>
                <img className='person-image' id='img2' src={blank} alt="img" />
                <h4 className='person-name'>Tony</h4>
              </div>
              <p className='person-text'>
                  Tony is a Software Engineer based in Accra, Ghana. He is responsible for the frontend of this project.
              </p>
              <div className='contacts'>
                <div className='icon'><a href='https://github.com/tcrz' target={'blank'}><BsGithub /></a></div>
                <div className='icon'><a href='https://www.linkedin.com/in/tony-baidoo' target={'blank'}><BsLinkedin /></a></div>
                <div className='icon'><a href='https://twitter.com/iam_tonnie' target={'blank'}><BsTwitter /></a></div>
              </div>
            </div>
            <div className='person'>
              <div className='person-desc'>
                <img className='person-image' id='img2' src={blank} alt="img" />
                <h4 className='person-name'>Rihana</h4>
              </div>
              <p className='person-text'>
                Rihana is a Software Engineer based in Riyadh, Saudi Arabia. She is responsible for the backend of this project.
              </p>
              <div className='contacts'>
                <div className='icon'><a href='https://github.com/avocadoclouds' target={'blank'}><BsGithub /></a></div>
                <div className='icon'><a href='https://www.linkedin.com/in/rihana-ali-saeid-68352b1bb/' target={'blank'}><BsLinkedin /></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//<h2 className='landing-text'>Get producktiv now!</h2>
//<img className='image' id='img2' src={img2}/>