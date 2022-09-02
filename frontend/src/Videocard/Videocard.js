import "./Videocard.css"


export const Videocard = (props) => {
  return (
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
  )
}