import './Login.css'

export const Login = () => {
  return (
    <form>
    <div className="login-box">
      <div className="login-heading">
        <h1>LOGIN</h1>
        <p>Log in to your Productiv account.</p>
      </div>
      <div className="login-details">
        <div className="email-box">
          <label><span>Email:</span><br />
          <input type="email" id="email" placeholder="example@duc.tiv" required/>
          </label>
        </div>
        <div className="password-box">
          <label><span>Password:</span><br />
          <input type="password" id="password" placeholder="password" required/>
          </label>
        </div>
        <div className="submit-btn">
          <input type="submit" id="submit" value="Log In"/>
        </div>
      </div>  
    </div>
    </form>
  )
}