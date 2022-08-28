import './Signup.css'

export const Signup = () => {
  return (
    <form>
    <div className="signup-box">
      <div className="signup-heading">
        <h1>SIGNUP</h1>
        <p>Create your Productiv account.</p>
      </div>
      <div className="signup-details">
        <div className="username-box">
          <label><span>Username:</span><br />
          <input type="text" id="username" placeholder="Tim" required/>
          </label>
        </div>
        <div className="email-box">
          <label><span>Email:</span><br />
          <input type="email" id="sg-email" placeholder="example@duc.tiv" required/>
          </label>
        </div>
        <div className="password-box">
          <label><span>Password:</span><br />
          <input type="password" id="sg-password" placeholder="password"  minlength="8" required/>
          </label>
        </div>
        <div className="submit-btn">
          <input type="submit" id="sg-submit" value="Sign Up"/>
        </div>
      </div>  
    </div>
    </form>
  )
}