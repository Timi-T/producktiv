import './Header.css'

export default function Header (props) {
  return (
    <nav>
      <h1>PRODUCTIV</h1>
      <button onClick={()=>props.toggleLoginSignup()}>
        {props.isLoginScreen ? "Sign Up" : "Log In"}
      </button>
    </nav>
  )
      
}