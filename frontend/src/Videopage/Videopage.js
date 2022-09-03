import { NavLink } from 'react-router-dom'
import { Loader } from '../Loader/Loader'
import {useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import './Videopage.css'

export const Videopage = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [isLoading])
  let location = useLocation();
  const {videoData} = location.state
  // console.log(videoData);
  return (
    <>
    {isLoading && <Loader loadingText={"Loading video..."}/>}
    {!isLoading && 
    <div className="video-display">
    <p>video display page</p>
    <h1>{videoData.videoName}</h1>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/rUrqp5kScu4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
    <NavLink to="/videos" >Back to courses</NavLink>
    </div>
    }
    </>
  )
}