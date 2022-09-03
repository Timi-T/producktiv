import "./Videocard.css"
import { NavLink, Link} from 'react-router-dom'

export const Videocard = (props) => {
  const data = props.selectVideo(props.id)
  return (
    <Link to="/videoplay" state={{videoData: data}}
     className="videoplay">
    <article class="video">
      <img src="https://reactjs.org/logo-og.png" />
      <div class="details">
        <div class="video-name">
          <h3>{props.videoName}</h3>
        </div>
        <div class="description">
          <p>{props.description}</p>
          </div>
        <div class="author">
          <p>By Tonio</p>
        </div>
      </div>
    </article>
    </Link>
  )
}