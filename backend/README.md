<h1>API documentation</h1>
<h3>Endpoints and expected payloads</h1>
<ul>
  <li>
    <h3>POST '/api/users'</h3>
    <ul>
      <li>Requires Authentication: False</li>
      <li>Creates a user profile</li>
      <li>Request argumets: {username: string, email: string, password: string}</li>
      <li>
        <p>Returns: An object containing the user's email and username</p>
        <p>{</p>
        <p>  username: string,</p>
        <p>  email: string</p>
        <p>}</p>
      <li>
    </ul>
  </li>
  <li>
    <h3>POST '/api/login'</h3>
    <ul>
      <li>Requires Authentication: False</li>
      <li>Authenticates a user and logs in the user</li>
      <li>Request argumets: {email: string, password: string}</li>
      <li>
        <p>Returns: 200 OK status code and a session token that expires after 24 hours</p>
        <p>A cookie for session management is set in the response: {auth_key: xxx}</p>
        <p>Now every request made from that device is linked to that user.</p>
        <p>When cookie expires, the user should be redirected to login</p>
      <li>
    </ul>
  </li>
</ul>