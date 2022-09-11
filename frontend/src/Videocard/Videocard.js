import "./Videocard.css"
import { Link } from 'react-router-dom';
import { ImBin } from "react-icons/im";


export const Videocard = (props) => {
  const data = props.selectVideo(props.id)
  return (
    
    <article class="video">
      <Link to="/videoplay" state={{videoData: data}}
     className="videoplay">
      <img src={props.videoThumbnail} alt="video-thumbnail"/>
      <div class="details">
        <div class="video-name">
          <h3>{props.videoName}</h3>
        </div>
        <div class="description">
          <p>{props.description}</p>
          </div>
        <div class="author">
          <p>{props.userName}</p>
        </div>
      </div>
      </Link>
      <div class="delete">
          <p onClick={() => props.deleteVideo(props.id)}><ImBin/>delete</p>
      </div>
    </article>
    
  )
}