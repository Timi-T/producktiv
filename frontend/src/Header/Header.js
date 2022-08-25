import './Header.css'

export default function Header (props) {
  return (
    <nav>
      <h1>PRODUCTIV</h1>
      <button onClick={()=>props.toggleLoginSignup()}>
        {props.isLoginScreen ? "Log In" : "Sign Up"}
      </button>
    </nav>
  )
      
}