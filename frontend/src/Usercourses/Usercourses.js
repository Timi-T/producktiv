import { AppContext } from '../App/AppContext';
import { Videocard } from '../Videocard/Videocard';
import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader'
import './Usercourses.css'


export const Usercourses = () => {
  const {resetUser} = React.useContext(AppContext)
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
  setIsLoading(true)
  fetch("http://localhost:5001/api/users/videos", { credentials: "include"})
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401){
          resetUser()
        }
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
      })
    .then((data) => {
      console.log(data)
      setVideos(data.videos)
      setIsLoading(false)
    })
    .catch((error)=>{
      setIsLoading(false)
      console.log(error)
    })
  }, [])

  const selectVideo = (id) => {
    const video = videos.filter((vid)=> vid._id === id)
    return(video[0]) 
  }

  const deleteVideo = (id) => {
    const vids = videos.filter((vid)=> vid._id !== id)
    fetch(`http://localhost:5001/api/videos/${id}`, { 
      method: "DELETE",
      credentials: "include" 
    })
    .then((response) => {
      console.log(response)
      if (!response) {
        if (response.status === 401) {
          resetUser()
        }
        throw Error(`${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .then((response)=>{
      setVideos(vids)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  // const userVideos = user.videos
  // console.log(userVideos)
  return(
    <>
    <div className="all-courses user-courses">
    <h1 style={{marginBottom:".2em"}}>My Courses</h1>
    {isLoading && <Loader loadingText={"Loading submitted courses..."}/>}
    {!isLoading &&
    <>
    {
      videos.length === 0 ? <p>Nothing to see here, you have not submitted any courses.</p> : (
      <>
        <p> View all the course videos you have submitted.</p>
        <div className="videos-list user-courses">
          {
            videos.map((item, index) => {
              return (
              <Videocard deleteVideo={deleteVideo} selectVideo={selectVideo} key={index} id={item._id} videoName={item.videoName} embedVideo={item.embedVideo} description={item.description} videoThumbnail={item.videoThumbnail}/>
              )
            })
          }
        </div>
      </>
      )
    }
    </>
    }
    </div>
    </>
  )
}