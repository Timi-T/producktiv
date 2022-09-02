import React, { useState } from 'react';
import './Videospage.css';
import { AppContext } from '../App/AppContext';
import { videos as vids } from './mockvideodata';
import { ImStatsDots, ImPencil2, ImEmbed2, ImAccessibility } from "react-icons/im";
import { Videocard } from '../Videocard/Videocard'; 

export const Videospage = () => {
  // const {user} = React.useContext(AppContext)
  const [videos, setVideos] = useState(vids)
  const categorySort = (category=undefined) => {
    let sortedVideos = vids
    if (category !== undefined) {
      sortedVideos = vids.filter((video)=> video.category == category)
    }
    setVideos(sortedVideos) 
  }

  return (
    <>
    <div className="all-courses">
      <h1>Explore</h1>
      <div className="categories">
      <input type="radio" id="all" name="course-choice"/><label for="all" class="selected" onClick={()=>categorySort(undefined)}>All categories</label>
      <input type="radio" id="programming" name="course-choice"/><label for="programming" class="selected" onClick={()=>categorySort("Programming")}><ImEmbed2/>Programming</label>
      <input type="radio" id="art" name="course-choice"/><label for="art" class="selected" onClick={()=>categorySort("Art")}><ImPencil2/>Art</label>
      <input type="radio" id="business" name="course-choice"/><label for="business" class="selected" onClick={()=>categorySort("Business")}><ImStatsDots/>Business</label>
      <input type="radio" id="lifestyle" name="course-choice"/><label for="lifestyle" class="selected" onClick={()=>categorySort("Lifestyle")}><ImAccessibility/>Lifestyle</label>
      {/* <a href="#programming" id="programming" onClick={()=>categorySort("Programming")}><ImEmbed2/>Programming</a>
      <a href="#art" id="art" onClick={()=>categorySort("Art")}><ImPencil2/>Art</a>
      <a href="#business" id="business" onClick={()=>categorySort("Business")}> <ImStatsDots/>Business</a>
      <a href="#lifestyle" id="lifestyle" onClick={()=>categorySort("Lifestyle")}><ImAccessibility/>Lifestyle</a> */}
      </div>
      <div className="videos-list">
        {
          videos.map((item, index) => {
            return (<Videocard videoName={item.videoName} description={item.description}/>)
          })
        }
      </div>
    </div>
    </>
  )
}