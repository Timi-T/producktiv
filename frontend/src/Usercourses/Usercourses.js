import { AppContext } from '../App/AppContext';
import { Videocard } from '../Videocard/Videocard';
import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader'


export const Usercourses = () => {
  const {resetUser} = React.useContext(AppContext)
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
  setIsLoading(true)
  fetch("http://localhost:5001/api/users/videos", { credentials: "include"})
    .then((response) => {
      if (!response.ok) {
        resetUser()
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
      // resetUser()
      console.log(error)
    })
  }, [])
  const selectVideo = (id) => {
    const video = videos.filter((vid)=> vid._id == id)
    return(video[0]) 
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
      videos.length == 0 ? <p>Nothing to see here, you have not submitted any courses.</p> : (
      <>
      <p> View all the course videos you have submitted.</p>
      <div className="videos-list">
        {
          videos.map((item, index) => {
            return (
            <Videocard selectVideo={selectVideo} id={item._id} videoName={item.videoName} videoLink={item.videoLink} description={item.description}/>
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