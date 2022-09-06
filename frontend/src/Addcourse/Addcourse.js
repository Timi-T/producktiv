import React from 'react';
import { AppContext } from '../App/AppContext';
import './Addcourse.css'

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
        if (response.status === 401){
          resetUser()
        }
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .then((response) => {
      this.setState({isLoading: false})
    })
    .then((error) => {
      console.log(error)
    })
    // console.log(this.state)
  }

  render() {
    return (
      <div className="all-courses submission-form">
      <h1 style={{marginBottom:"0"}}>Add a course</h1>
      <p>Know some useful resources? Share so others can stay as producktiv as you! Please note that only Youtube video urls are currently accepted.</p>
       <form onSubmit={this.handleCourseSubmit}>
      <div className="login-box add-course-box">
        <div className="course-details">
          <div className="video-name-box">
            <label><span>Video Name:</span><br />
            <input type="text" id="video-name" placeholder="React Crash Course" value={this.state.videoName} onChange={this.handleChangeVideoName} required/>
            </label>
          </div>
          <div className="video-link-box">
            <label><span> Video Link:</span><br />
            <input type="url" id="video-link" placeholder="https://youtu.be/zdJEYhA2AZQ" value={this.state.videoLink} onChange={this.handleChangeVideoLink} required/>
            </label>
          </div>
          <div className="category-box">
            <label for="category"><span>Category:</span><br />
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
      </form>
      </div>
    )
  }
}
Addcourse.contextType = AppContext
