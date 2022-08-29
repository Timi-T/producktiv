import './Loader.css'

export const Loader = ({message}) => {
  return (
    <div className="spinner-box">
      <div className="three-quarter-spinner"></div>
      <p>{message}</p>
    </div>
  )
}