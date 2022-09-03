import { AppContext } from '../App/AppContext';
import { Videocard } from '../Videocard/Videocard';
import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader'


export const Usercourses = () => {
  const {user} = React.useContext(AppContext)
  const [videos, setVideos] = useState(user.videos)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [isLoading])
  const selectVideo = (id) => {
    const video = videos.filter((vid)=> vid._id == id)
    return(video[0]) 
  }
  // const userVideos = user.videos
  // console.log(userVideos)
  return(
    <>
    {isLoading && <Loader loadingText={"Loading video..."}/>}
    {!isLoading &&
    <div className="all-courses">
    <div className="videos-list">
    {
      videos.map((item, index) => {
        return (
        <Videocard selectVideo={selectVideo} id={item._id} videoName={item.videoName} videoLink={item.videoLink} description={item.description}/>
        )
      })
    }
    </div>
    </div>
    }
    </>
  )
}