<h1>API documentation</h1>
<h3>Endpoints and expected payloads</h1>
<ul>

  <li>
    <h3>POST '/api/users'</h3>
    <h4>using curl -> curl -XPOST http://localhost:5001/api/users -H "content-type: application/json" -d '{"username": "UNIQUE_NAME", "email": "UNIQUE_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <ul>
      <li>Requires Authentication: False</li>
      <li>Creates a user profile</li>
      <li>
        Request argumets:
        <p>{</p>
        <p>__username: string,</p>
        <p>__email: string</p>
        <p>__password: string</p>
        <p>}</p>
      </li>
      <li>
        <p>ON SUCCESS -> Returns Nothing</p>
        <p>Status code -> 200 (OK)</p>
      <li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When user with that email already exists</p>
            <p>Status code -> 400 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "User exists"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the operation fails with no reason</p>
            <p>Status code -> 400 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "Unknown error"</p>
            <p>}</p>
          </li>
          <li>
            <p>When a required data is missing</p>
            <p>Status code -> 400 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "Missing [ dataname ]"</p>
            <p>}</p>
            <p>where dataname can be email, password or username</p>
          </li>
        </ul>
      <li>
    </ul>
  </li>


  <li>
    <h3>POST '/api/login'</h3>
    <h4>using curl -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <ul>
      <li>Requires Authentication: False</li>
      <li>Authenticates a user and logs in the user</li>
      <li>
        Request argumets:
        <p>{</p>
        <p>__email: string</p>
        <p>__password: string</p>
        <p>}</p>
      </li>
      <li>
        <p>ON SUCCESS -> Returns a session token that expires after 24 hours</p>
        <p>{</p>
            <p>__token: "xxxabc000"</p>
        <p>}</p>
        <p>Status code -> 200 (OK)</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the credentials are wrong</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "Unauthorized"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the operation fails with no reason</p>
            <p>Status code -> 400</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "Unknown error"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
      <p>A cookie for session management is set in the response: {auth_key: xxx}</p>
      <p>Now every request made from that device is linked to that user.</p>
      <p>When cookie expires, the user should be redirected to login</p>
    </ul>
  </li>


  <li>
    <h3>GET '/api/users'</h3>
    <ul>
      <li>Requires Authentication: False</li>
      <li>Gets a list of all registered users</li>
      <li>
        Request argumets: None
      </li>
      <li>
        <p>ON SUCCESS -> Returns a list of ouser objects</p>
        <p>Status code -> 200 (OK)</p>
      </li>
      <li>
        <p>ON FAILURE -> No possible failure scenerio</p>
      </li>
    </ul>
  </li>


  <li>
    <h3>DELETE '/api/users/logout'</h3>
    <h4>using curl -> curl -XDELETE http://localhost:5001/api/logout</h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Ends a current user session</li>
      <li>
        Request argumets: None
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>{</p>
            <p>__message: "Goodbye"</p>
        <p>}</p>
        <p>Status code -> 204 (No content)</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the user isn't logged in</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "Unauthorized User"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
      <p>The cookie for the current session is deleted</p>
      <p>Redirect user to login</p>
    </ul>
  </li>


  <li>
    <h3>DELETE '/api/users/:id'</h3>
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>using curl -> curl -XDELETE http://localhost:5001/api/users/USER_ID --cookie "auth_key=SESSION_TOKEN"</h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Deletes a user from the records</li>
      <li>
        Request argumets: None
        Url parameter: USER_ID
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>{</p>
            <p>__message: "User Deleted"</p>
        <p>}</p>
        <p>Status code -> 204 (No content)</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the user isn't logged in</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "Unauthorized User"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the a user tries to delete another user</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "You do not have the permissions to delete this user"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the a user doesnt exist</p>
            <p>Status code -> 400 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>__error: "User does not exist"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
      <p>The cookie for the current session is deleted</p>
      <p>The user is deleted</p>
      <p>Redirect to login</p>
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
