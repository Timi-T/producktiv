import './Loader.css'

export const Loader = ({loadingText}) => {
  return (
    <div className="spinner-box">
      <div className="three-quarter-spinner"></div>
      <p>{loadingText}</p>
    </div>
  )
}