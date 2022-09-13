import React, { useState, useEffect } from 'react';
import './Coursespage.css';
import { AppContext } from '../App/AppContext';
import { ImStatsDots, ImPencil2, ImEmbed2, ImAccessibility } from "react-icons/im";
import { Videocard } from '../Videocard/Videocard'; 
import { Loader } from '../Loader/Loader'


export const Coursespage = () => {
  const {resetUser} = React.useContext(AppContext)
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const getVideos = (resource) => {
    setError("")
    setIsLoading(true)
    fetch(`https://producktiv-backend.onrender.com/api/${resource}`, { credentials: "include"})
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401 ){
            resetUser()
          }
          throw Error(`${response.status}: ${response.statusText}`)
        }
        return response.json()
        })
      .then((data) => {
        setVideos(data.videos)
        setIsLoading(false)
      })
      .catch((error)=>{
        setIsLoading(false)
        if (error.message === '404: Not Found') {
          setVideos([])
        } else {
          setError(error)
        }
        console.log(error)
      })
  }

  useEffect(() => {
    getVideos("videos")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const categorySort = (categoryName=undefined) => {
    if (categoryName !== undefined) {
      getVideos(`categories/${categoryName}`)
    } else {
      getVideos("videos")
    }
  }

  const selectVideo = (id) => {
    const video = videos.filter((vid)=> vid._id === id)
    return(video[0]) 
  }

  return (
    <>
    <div className="all-courses">
      <h1>Explore</h1>
      <div className="categories">
      <input type="radio" id="all" name="course-choice"/><label htmlFor="all" className="selected" onClick={()=>categorySort(undefined)}>All categories</label>
      <input type="radio" id="programming" name="course-choice"/><label htmlFor="programming"  className="selected" onClick={()=>categorySort("Programming")}><ImEmbed2/>Programming</label>
      <input type="radio" id="art" name="course-choice"/><label htmlFor="art"  className="selected" onClick={()=>categorySort("Art")}><ImPencil2/>Art</label>
      <input type="radio" id="business" name="course-choice"/><label htmlFor="business"  className="selected" onClick={()=>categorySort("Business")}><ImStatsDots/>Business</label>
      <input type="radio" id="lifestyle" name="course-choice"/><label htmlFor="lifestyle"  className="selected" onClick={()=>categorySort("Lifestyle")}><ImAccessibility/>Lifestyle</label>
      </div>
      {error && <div className="error"><p>Sorry, an error occured while loading videos. Try again.</p></div>}
      { isLoading ? <Loader loadingText={"Loading content..."}/> : (
        !error && videos.length === 0 ? <div className="notice"><p>There are no videos in this category. Add one?</p></div> : !error && <div className="videos-list">
        {
          videos.map((item, index) => {
            return (
            <Videocard selectVideo={selectVideo} key={index} id={item._id} videoName={item.videoName} embedVideo={item.embedVideo} description={item.description} videoThumbnail={item.videoThumbnail} userName={`By: ${item.userName}`}/>
            )
          })
        }
      </div>)
      }
    </div>
    </>
  )
}