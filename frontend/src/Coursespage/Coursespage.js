import React, { useState, useEffect } from 'react';
import './Coursespage.css';
import { AppContext } from '../App/AppContext';
import { videos as vids } from './mockvideodata';
import { ImStatsDots, ImPencil2, ImEmbed2, ImAccessibility } from "react-icons/im";
import { Videocard } from '../Videocard/Videocard'; 
import { Loader } from '../Loader/Loader'


export const Coursespage = () => {
  const {resetUser} = React.useContext(AppContext)
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const allVideos = []
  const getVideos = (resource) => {
    setIsLoading(true)
    fetch(`http://localhost:5001/api/${resource}`, { credentials: "include"})
      .then((response) => {
        if (!response.ok) {
          resetUser()
          throw Error(`${response.status}: ${response.statusText}`)
        }
        return response.json()
        })
      .then((data) => {
        console.log(data)
        setVideos(data.video)
        setIsLoading(false)
      })
      .catch((error)=>{
        // resetUser()
        console.log(error)
      })
  }

  useEffect(() => {
    getVideos("videos")
  }, [])

  const categorySort = (categoryName=undefined) => {
    if (categoryName !== undefined) {
      getVideos(`categories/${categoryName}`)
    } else {
      getVideos("videos")
    }
  }

  const selectVideo = (id) => {
    const video = videos.filter((vid)=> vid._id == id)
    return(video[0]) 
  }

  return (
    <>
    <div className="all-courses">
      <h1>Explore</h1>
      <div className="categories">
      <input type="radio" id="all" name="course-choice"/><label htmlFor="all" class="selected" onClick={()=>categorySort(undefined)}>All categories</label>
      <input type="radio" id="programming" name="course-choice"/><label htmlFor="programming" class="selected" onClick={()=>categorySort("Programming")}><ImEmbed2/>Programming</label>
      <input type="radio" id="art" name="course-choice"/><label htmlFor="art" class="selected" onClick={()=>categorySort("Art")}><ImPencil2/>Art</label>
      <input type="radio" id="business" name="course-choice"/><label htmlFor="business" class="selected" onClick={()=>categorySort("Business")}><ImStatsDots/>Business</label>
      <input type="radio" id="lifestyle" name="course-choice"/><label htmlFor="lifestyle" class="selected" onClick={()=>categorySort("Lifestyle")}><ImAccessibility/>Lifestyle</label>
      </div>
      { isLoading ? <Loader loadingText={"Loading content..."}/> : <div className="videos-list">
        {
          videos.map((item, index) => {
            return (
            <Videocard selectVideo={selectVideo} key={index} id={item._id} videoName={item.videoName} embedVideo={item.embedVideo} description={item.description} videoThumbnail={item.videoThumbnail}/>
            )
          })
        }
      </div>
      }
    </div>
    </>
  )
}