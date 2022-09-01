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
        <p>- username: string,</p>
        <p>- email: string</p>
        <p>- password: string</p>
        <p>}</p>
      </li>
      <li>
        <p>ON SUCCESS -> Returns a success message</p>
        <p>Status code -> 200 (OK)</p>
        <p>{</p>
        <p>- success: true</p>
        <p>}</p>
      <li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When user with that email already exists</p>
            <p>Status code -> 400 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "User exists"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the operation fails with no reason</p>
            <p>Status code -> 400 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Unknown error"</p>
            <p>}</p>
          </li>
          <li>
            <p>When a required data is missing</p>
            <p>Status code -> 400 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Missing [ dataname ]"</p>
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
        <p>- email: string</p>
        <p>- password: string</p>
        <p>}</p>
      </li>
      <li>
        <p>ON SUCCESS -> Returns a session token that expires after 24 hours</p>
        <p>Status code -> 200 (OK)</p>
        <p>{</p>
        <p>- token: "xxxabc000"</p>
        <p>}</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the credentials are wrong</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Unauthorized"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the operation fails with no reason</p>
            <p>Status code -> 400</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Unknown error"</p>
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
      <li>Requires Authentication: True</li>
      <li>Gets a list of all registered users if cookie is there</li>
      <li>
        Request argumets: None
      </li>
      <li>
        <p>ON SUCCESS -> Returns a list of ouser objects</p>
        <p>Status code -> 200 (OK)</p>
        <p>{</p>
        <p>- username: "USERNAME"</p>
        <p>- _id: "USER_ID"</p>
        <p>- videos: [VIDEO IDS]</p>
        <p>- notes: [NOTE IDS]</p>
        <p>- articles: [ARTICLES IDS]</p>
        <p>- ratings: [RATING IDS]</p>
        <p>- avgRating: 4.5</p>
        <p>}</p>
      </li>
      <li>
        <p>ON FAILURE -> No possible failure scenerio</p>
      </li>
    </ul>
  </li>


  <li>
    <h3>DELETE '/api/logout'</h3>
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>using curl -> curl --cookie "auth_key=SESSION_TOKEN" 0.0.0.0:5001/api/logout -XDELETE ; echo ""</h4>
    <ul>
      <li>
      <p>on command-line write this command</p>
      <p>redis-cli</p>
      <p>127.0.0.1:6379> get auth_SESSION_TOKEN</p>
      <p>127.0.0.1:6379> "630f8655e345ae2e037cb1bf"</p>
      <p>Above line shows that a session is stored in redis-cli, and the value is user's ID</p>
      </li>
      <li>Requires Authentication: True</li>
      <li>Ends a current user session</li>
      <li>
        Request argumets: None
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>Status code -> 200 (No content)</p>
        <p>{</p>
            <p>- message: "Goodbye"</p>
        <p>}</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the user isn't logged in</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Unauthorized User"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the there is no cookie or when given the wrong cookie</p>
            <p>Status code -> 401</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- message: "Cookie Expired"</p>
            <p>}</p>
          </li> 
        </ul>
      </li>
      <p>on command-line write this command</p>
      <p>redis-cli</p>
      <p>127.0.0.1:6379> get auth_SESSION_TOKEN</p>
      <p>127.0.0.1:6379> (nil)</p>
      <p>As you can see the token is removed from redis</p>
      <p>Redirect user to login</p>
    </ul>
  </li>


  <li>
    <h3>DELETE '/api/signout'</h3>
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>using curl -> curl -XDELETE http://localhost:5001/api/signout --cookie "auth_key=SESSION_TOKEN"</h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Deletes a user from the records</li>
      <li>Deletes token from redis</li>
      <li>
        Request argumets: None
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>Status code -> 200 (No content)</p>
        <p>{</p>
            <p>- message: "User Deleted"</p>
        <p>}</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the a user doesnt exist</p>
            <p>Status code -> 401 (Bad request)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "User does not exist"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the there is no cookie or when given the wrong cookie</p>
            <p>Status code -> 401</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- message: "Cookie Expired"</p>
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
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>
      using curl -> curl -XPOST http://localhost:5001/api/videos -H "content-type: application/json" -d '{"videoName": "VIDEO_NAME", "description": "SHORT_DESCRIPTION", "category": "VIDEO_CATEGORY", "videoLink": "YOUTUBE_LINK"}' --cookie "auth_key=SESSION_TOKEN"
    </h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Uploads a video</li>
      <li>
        Request argumets:
        <p>{</p>
        <p>- videoName: "VIDEO_NAME"</p>
        <p>- description: "SHORT_DESCRIPTION"</p>
        <p>- category: "CATEGORY"</p>
        <p>- videoLink: "VIDEO_LINK"</p>
        <p>}</p>
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>Status code -> 201 (Created)</p>
        <p>{</p>
        <p>- message: "Uploaded video"</p>
        <p>}</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the user isn't logged in</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Unauthorized User"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the there is no cookie or when given the wrong cookie</p>
            <p>Status code -> 401</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- message: "Cookie Expired"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the video link has been uploaded already by another user</p>
            <p>Status code -> 300 (Multiple choices)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Video Exists"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
    </ul>
  </li>


  <li>
    <h3>GET '/api/videos/:id'</h3>
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>using curl -> curl -XGET http://localhost:5001/api/videos/VIDEO_ID --cookie "auth_key=SESSION_TOKEN"</h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Gets a video from the records</li>
      <li>
        Request argumets: None
        Url parameter: VIDEO_ID
      </li>
      <li>
        <p>ON SUCCESS -> Returns a video object</p>
        <p>Status code -> 200 (OK)</p>
        <p>{</p>
        <p>- videoName: "VIDEO_NAME"</p>
        <p>- description: "SHORT_DESCRIPTION"</p>
        <p>- category: "CATEGORY"</p>
        <p>- videoLink: "VIDEO_LINK"</p>
        <P>- uploadDate: "UPLOAD_DATE"</p>
        <P>- userId: "USER_ID"</p>
        <P>- stats: {"viewCount: '0', "likeCount": '0', "commentCount": '0'</p>
        <P>- comments: [COMMENT IDS]</p>
        <P>- ratings: [RATING IDS]</p>
        <P>- avgRating: AVG_RATING</p>
        <p>}</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the user isn't logged in</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Unauthorized User"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the video is not found</p>
            <p>Status code -> 404 (Not found)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Video Doesn't exists"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the there is no cookie or when given the wrong cookie</p>
            <p>Status code -> 401</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- message: "Cookie Expired"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
    </ul>
  </li>


  <li>
    <h3>DELETE '/api/videos/:id'</h3>
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>using curl -> curl -XDELETE http://localhost:5001/api/videos/VIDEO_ID --cookie "auth_key=SESSION_TOKEN"</h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Deletes a video from the records</li>
      <li>
        Request argumets: None
        Url parameter: VIDEO_ID
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>Status code -> 200 (OK)</p>
        <p>{</p>
        <p>- message: "Video Deleted"</p>
        <p>}</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the user isn't logged in</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Unauthorized User"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the there is no cookie or when given the wrong cookie</p>
            <p>Status code -> 401</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- message: "Cookie Expired"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the requested video is not found</p>
            <p>Status code -> 404 (Not found)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Video Doesn't exists"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <h3>GET '/api/videos'</h3>
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>using curl -> curl -XGET http://localhost:5001/api/videos --cookie "auth_key=SESSION_TOKEN"</h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Retrieves all videos from the user's list of videos</li>
      <li>
        Request argumets: None
        Url parameter: None
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>Status code -> 200 (OK)</p>
        <p>[LIST OF ALL VIDEOS OF A USER]</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When the there is no cookie or when given the wrong cookie</p>
            <p>Status code -> 401</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- message: "Cookie Expired"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
    </ul>
  </li>


 <li>
    <h3>GET '/api/categories/:name'</h3>
    <h4>To get SESSION_TOKEN -> curl -XPOST http://localhost:5001/api/login -H "content-type: application/json" -d '{"email": "USER_EMAIL", "password": "USER_PASSWORD"}'</h4>
    <h4>using curl -> curl -XGET http://localhost:5001/api/categories/Programming --cookie "auth_key=SESSION_TOKEN"</h4>
    <ul>
      <li>Requires Authentication: True</li>
      <li>Retrieves all videos of a specific category and stores them for 3 days in redis for easier retrieval next time</li>
      <li>
        Request argumets: None
        Url parameter: name of category
      </li>
      <li>
        <p>ON SUCCESS -> Returns a message</p>
        <p>Status code -> 200 (OK)</p>
        <p>[RETURNS A LIST OF ALL VIDEOS BELONGING TO SIMILAR CATEGORY]</p>
      </li>
      <li>
        <p>ON FAILURE -> Returns An object</p>
        <ul>
          <li>
            <p>When sending a non existing category from command line</p>
            <p>Status code -> 401 (Unauthorized)</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- error: "Category Doesn't exist"</p>
            <p>}</p>
          </li>
          <li>
            <p>When the there is no cookie or when given the wrong cookie</p>
            <p>Status code -> 401</p>
            <p>Returns:</p>
            <p>{</p>
            <p>- message: "Cookie Expired"</p>
            <p>}</p>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
