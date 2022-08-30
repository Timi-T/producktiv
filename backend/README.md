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
  <li>
    <h3>GET '/api/users'</h3>
    <ul>
      <li>Requires Authentication: False</li>
      <li>Gets all users</li>
      <li>No Arguments needed</li>
      <li>
        <p>Returns: 200 OK status code</p>
        <p>For API purpose only</p>
      <li>
    </ul>
  </li>
  <li>
    <h3>DELETE '/api/users/logout'</h3>
    <ul>
      <li>Requires Authentication: False</li>
      <li>DELETES cookie when a user wants to log out</li>
      <li>No Arguments needed</li>
      <li>
        <p>Returns: 200 OK status code</p>
        <p>A cookie for session management is set in the response: {auth_key: xxx}</p>
        <p>Now every request made from that device is linked to that user.</p>
        <p>When cookie is deleted, the user should be redirected to login</p>
      <li>
    </ul>
  </li>
  <li>
    <h3>DELETE '/api/users/:id'</h3>
    <ul>
      <li>Requires Authentication: False</li>
      <li>DELETES user and cookie when a user wants to sign out</li>
      <li>id is a parameter, It is the ID of user, It should be shaved somewhere in the page</li>
      <li>
        <p>Returns: 200 OK status code</p>
        <p>When user and cookie is deleted, the user should be redirected to login</p>
      <li>
    </ul>
  </li>
  <li>
    <h3>POST '/api/videos'</h3>
    <ul>
      <li>Requires a Cookie: After user logs in a cookie should be used to identify it so as to add to a video to databse and also add video to user's list</li>
      <li>POST: Uploads video with a video name, description, category and video link Date and userId will be generated from backend</li>
      <li>No parameters needed</li>
      <li>The form requirements should be sent via request.body</li>
      <li>
        <p>Returns: 201 status code, with comment "Uploaded Video", when video is uploaded successfully</p>
        <p>Returns: 300 status code, with comment "Video Exists", if a video of similar link exists in the database, Redirect to upload pop-op</p>
        <p>Returns: 401 status code, with comment "Unauthorized", if user isn't found</p>
      <li>
    </ul>
  </li>
  <li>
    <h3>GET '/api/videos/:id'</h3>
    <ul>
      <li>Requires no cookie or Authentication</li>
      <li>GET: gets video with a video name, description, category and video link Date and userId will be generated from backend</li>
      <li>parameters id: Id of the video, iT should exists with the video card</li>
      <li>Nothing should be sent via request.body</li>
      <li>
        <p>Returns: 200 status code, with the video content</p>
        <p>Returns: 401 status code, with comment "Unauthorized", if video isn't found</p>
        <p>More features will be added when recently used video object is added to the database</p>
      <li>
    </ul>
  </li>
  <li>
    <h3>DELETE '/api/videos/:id'</h3>
    <ul>
      <li>Requires a cookie: To retrieve user and delete the video from user's list of videos</li>
      <li>DELETE: deletes video from database and user's list</li>
      <li>parameters id: Id of the video, it should exists with the video card</li>
      <li>Nothing should be sent via request.body</li>
      <li>
        <p>Returns: 200 status code, when deleted successfully with comment "Video Deleted"</p>
        <p>Returns: 401 status code, with comment "Video Doesn't exists", if video isn't found</p>
        <p>More features will be added when recently used video object is added to the database</p>
      <li>
    </ul>
  </li>
</ul>
