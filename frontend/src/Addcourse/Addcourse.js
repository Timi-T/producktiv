import React from 'react';
import { AppContext } from '../App/AppContext';
import './Addcourse.css'
import { ImCheckmark } from "react-icons/im";
import { Loader } from '../Loader/Loader';
import { NavLink } from 'react-router-dom'


export class Addcourse extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        videoName: "",
        videoLink: "",
        category: "",
        description: "",
        isLoading: false,
        statusCode: null
    }
  }


  handleChangeVideoName = (event) => {
    this.setState({videoName: event.target.value})
  }

  handleChangeVideoLink = (event) => {
    this.setState({videoLink: event.target.value})
  }

  handleChangeCategory = (event) => {
    this.setState({category: event.target.value})
  }

  handleChangeDescription = (event) => {
    this.setState({description: event.target.value})
  }

  resetInputs = () => {
    this.setState({
      videoName: "",
      videoLink: "",
      category: "",
      description: ""
    })
  }

  handleCourseSubmit = (event) => {
    const {resetUser} = this.context
    event.preventDefault()
    this.setState({isLoading: true})
    fetch('http://localhost:5001/api/videos', 
    {
      method: "POST",
      body: JSON.stringify({
        videoName: this.state.videoName,
        videoLink: this.state.videoLink, 
        category: this.state.category, 
        description: this.state.description
      }),
      credentials: "include",
      headers: {'Content-Type': 'application/json'}
    })
    .then(response =>{
      this.setState({statusCode: response.status})
      if (!response.ok) {
        if (response.status === 401) {
          resetUser()
        }
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .then((response) => {
      this.setState({isLoading: false})
      this.resetInputs()
    })
    .catch((error) => {
      this.setState({isLoading: false})
      console.log(error)
    })
  }

  render() {
    const {isLoading, statusCode} = this.state
    const errorCheck = (statusCode) => {
      if (statusCode !== null) {
        if (statusCode === 201) {
          return <p style={{color:"green"}}><ImCheckmark/>&nbsp;&nbsp;Video has successfully been added.<br/>Take a look here:&nbsp;<NavLink to="/courses" style={{color:"var(--text-color)"}}>My courses</NavLink></p>
        } else if (statusCode === 404) {
          return <p style={{color:"red"}}>Youtube URL is not a valid video.</p>
        } else if (statusCode === 300) {
          return <p style={{color:"red"}}>This video already exists.</p>
        } else {
          return <p style={{color:"red"}}>Sorry, an error occured! Try again. </p>
        }
      }
    }
    return (
      <div className="all-courses submission-form">
      <h1 style={{marginBottom:"0"}}>Add a course</h1>
      <p>Know some useful resources? Share so others can stay as producktiv as you! Please note that only Youtube video urls are currently accepted.</p>
       {isLoading ? <Loader loadingText={"Submitting video..."}/> : <form onSubmit={this.handleCourseSubmit}>
      <div className="login-box add-course-box">
        {errorCheck(statusCode)}
        <div className="course-details">
          <div className="video-name-box">
            <label><span>Video Name:</span><br />
            <input type="text" id="video-name" placeholder="React Crash Course" value={this.state.videoName} onChange={this.handleChangeVideoName} required/>
            </label>
          </div>
          <div className="video-link-box">
            <label><span> Video Link:</span><br />
            <input type="url" id="video-link" placeholder="https://youtu.be/zdJEYhA2AZQ" pattern="https://youtu.be/.*" 
             onInvalid={e => e.target.setCustomValidity("This url does not match the right pattern. Valid Youtube video urls can be found in the share tab below the video")}
             onInput={e => e.target.setCustomValidity("")} value={this.state.videoLink} onChange={this.handleChangeVideoLink} required/>
            </label>
          </div>
          <div className="category-box">
            <label htmlFor="category"><span>Category:</span><br />
            <select name="category-options" id="category" value={this.state.category} onChange={this.handleChangeCategory} required>
              <option value="">Please choose a category</option>
              <option value="Art">Art</option>
              <option value="Business">Business</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Programming">Programming</option>
            </select>
            </label>
          </div>
          <div className="description-box">
            <label htmlFor="description"><span>Description:</span><br/>
            <textarea id="description" value={this.state.description} onChange={this.handleChangeDescription} required/>
            </label>
          </div>
          <div className="submit-btn">
            <input type="submit" id="submit" value="Submit"/>
          </div>
        </div>  
      </div>
      </form>}
      </div>
    )
  }
}
Addcourse.contextType = AppContext
