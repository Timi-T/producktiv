import "./Videocard.css"
import { Link } from 'react-router-dom';
import { ImBin } from "react-icons/im";


export const Videocard = (props) => {
  const data = props.selectVideo(props.id)
  return (
    
    <article  className="video">
      <Link to="/videoplay" state={{videoData: data}}
     className="videoplay">
      <img src={props.videoThumbnail} alt="video-thumbnail"/>
      <div  className="details">
        <div  className="video-name">
          <h3>{props.videoName}</h3>
        </div>
        <div  className="description">
          <p>{props.description}</p>
          </div>
        <div  className="author">
          <p>{props.userName}</p>
        </div>
      </div>
      </Link>
      <div  className="delete">
          <p onClick={() => props.deleteVideo(props.id)}><ImBin/>delete</p>
      </div>
    </article>
    
  )
}