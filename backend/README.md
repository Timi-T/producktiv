<h2>API docs</h2>
<hr>
<p>On the main README you've seen how the app works. On this README you'll see how the backend routes work. So let's get started.</p>
<p>On the terminal run the following code to install dependencies.</p>

```
vagrant@ubuntu-focal:~/producktiv/backend$ npm install
```
<p>Once installation is done, you will need to start the express server. At the end you will see the following code, which means the server is waiting on you to give a request.</p>

```
vagrant@ubuntu-focal:~/producktiv/backend$ npm run start-server
```
```
> files_manager@1.0.0 start-server /home/vagrant/producktiv/backend
> nodemon --exec babel-node --presets @babel/preset-env ./server.js

[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env ./server.js`
App listening on port 5001
```
<p>Open a second terminal where we will start the request.</p>

---

<h3>Creating a user</h3>

`POST '/api/users'`

- This will add a new user to database.
- Request body: This is your own information

```
{
  "username": "Samra",
  "email": "samsol40@gmail.com",
  "password": "helloworld"
}
```
<p>Example:</p>

```
curl 0.0.0.0:5001/api/users -XPOST -H "Content-Type: application/json" -d '{"username": "Samra", "email": "samsol40@gmail.com", "password": "helloworld"}'; echo ""
```
- Returns: a success message.
```
{"success":true}
```

<p>Now let's see what happens when there is a missing data on the body. I will exclude a username from the request body.</p>

```
{
  "email": "samrasol40@gmail.com",
  "password": "helloworld"
}
```
- Returns: an error message and status code 400.
```
{"error":"Missing username"}
`
<p>If a user of the same email exists.</p>

```
{
  "username": "Samra",
  "email": "samrasol40@gmail.com",
  "password": "helloworld"
}
```
- Returns: an error message and status code 400.
```
{"error":"User exists"}
```
---

<h3>Login a user</h3>

<p>Let's first create base64 encoded text using this link <a href="https://base64.guru/converter">for base converter</a>. From the above email and password you can create a text that will be encoded. Eg. samsol40@gmail.com:helloworld. Add a colon between the email and password. Convert this text to base64 in the link above.</p>

<img src='./images/encoding.png' alt="encoded" align="center">

<p>Use the encoded text that looks gibberish and add it to the request body.</p>


`POST '/api/login'`

- This will login a user and create a token to be used as a cookie during a session.
- Request Header: c2Ftc29sNDBAZ21haWwuY29tOmhlbGxvd29ybGQ=
```
{
  headers: "Authorization: Basic c2Ftc29sNDBAZ21haWwuY29tOmhlbGxvd29ybGQ="
}
```
<p>Example:</p>

```
curl 0.0.0.0:5001/api/login -XPOST -H "Authorization: Basic c2Ftc29sNDBAZ21haWwuY29tOmhlbGxvd29ybGQ="; echo ""
```
- Returns: The users information with the password that is hashed, and the other information like videos and you'll get a token that you will use as cookie.
```
{
  "user": 
  {
    "_id":"631e0e61e3a5f0219ea3059e",
    "username":"Samra",
    "email":"samsol40@gmail.com",
    "password":"6adfb183a4a2c94a2f92dab5ade762a47889a5a1",
    "videos":[],
    "notes":[],
    "articles":[],
    "ratings":[],
    "avgRating":0,
    "token":"6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
  }
}
```

<p>If the user doesn't exist, you'll receive an error.</p>

- Request Header: c2Ftc29sNDBAZ21haWwuY29tOmhlbGxvd29ybGQ=
```
{
  headers: "Authorization: Basic c2FtcmFzb2xvbW9uNDBAZ21haWwuY29tOmhlbGxvd29ybGQ="
}
```
- Returns: error about an unauthorized user and status code 401.
```
{"error":"Unauthorized"}
```
---

<h3>Post a video</h3>

`POST '/api/videos'`

- This will create a video in database. It will also add it to the user's video list and to a category's list of videos.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request Body:
```
{
  "videoName": "Trial #1 Video",
  "category": "Programming",
  "videoLink": "https://youtu.be/6tNS--WetLI",
  "description": "This is a video trial to see if a vide can be installed"
}
```
<p>Example:</p>

```
curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/videos -XPOST -H "Content-Type: application/json" -d '{"videoName": "Trial #1 Video", "category":"Programming", "videoLink": "https://youtu.be/6tNS--WetLI", "description": "This is a video trial to see if a vide can be installed"}'; echo ""
```
- Returns: Uploaded Message.
```
{"message":"Uploaded video"}
```

<p>Now let's see what happens if there is no cookie.</p>

- Request Body:
```
{
  "videoName": "Trial #1 Video",
  "category": "Programming",
  "videoLink": "https://youtu.be/6tNS--WetLI",
  "description": "This is a video trial to see if a vide can be installed"
}
```
- Returns: error message about expired session since cookie isn't provided and status code 401.
```
{"message":"Cookie Expired"}
```
<p>Now let's see what happens if there is missing video attribute.</p>

- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request Body:
```
{
  "category": "Programming",
  "videoLink": "https://youtu.be/6tNS--WetLI",
  "description": "This is a video trial to see if a vide can be installed"
}
```
- Returns: Error message about missing attribute and status code 404.
```
{"error":"Missing Video Name"}
```

<p>If someone tries to add a video that already exists in database.</p>

- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request Body:
```
{
  "videoName": "Trial #1 Video",
  "category": "Programming",
  "videoLink": "https://youtu.be/6tNS--WetLI",
  "description": "This is a video trial to see if a vide can be installed"
}
```
- Returns: Message about an existing video and status code 300.

```
{ message: 'Video Exists' }
```

<p>If a URL isn't valid.</p>

- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request Body:
```
{
  "videoName": "Trial #1 Video",
  "category": "Programming",
  "videoLink": "https://youtu.be/2_34seHytlro5609",
  "description": "This is a video trial to see if a vide can be installed"
}
```
- Returns: Message about video URL invalid and status code 404.

```
{ message: 'Video URL is incorrect' }
```
---
<h3>Show all users</h3>

`GET '/api/users'`

- This will show all users.
- Request body: None.

<p>Example:</p>

```
 curl  0.0.0.0:5001/api/users -XGET; echo ""
```
- Returns: All the users.
```
{
  "users":
  [{
    "_id":"631e0e61e3a5f0219ea3059e",
    "username":"Samra",
    "videos":
      [{
        "videoName":"Trial #1 Video",
        "category":"Programming",
        "userId":"631e0e61e3a5f0219ea3059e",
        "uploadDate":"2022-09-11T17:49:56.870Z",
        "description":"This is a video trial to see if a vide can be installed",
        "embedVideo":"https://www.youtube.com/embed/6tNS--WetLI",
        "userName":"Samra",
        "videoThumbnail":"https://i.ytimg.com/vi/6tNS--WetLI/hqdefault.jpg",
        "stats":
          {
            "viewCount":"1011400",
            "likeCount":"19725",
            "commentCount":"0"
          },
        "comments":[],
        "ratings":[],
        "avgRating":0,
        "_id":"631e1fc79fbea132961d6574"
      }],
    "notes":[],
    "articles":[],
    "ratings":[],
    "avgRating":0
  ]}
}
```
<p>If there are no users in database</p>

- Returns: an empty list

```
{"users":[]}
```
---
<h3>Show user's videos</h3>

`GET '/api/users/videos'`

- This will show all user's videos.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request body: None.

<p>Example:</p>

```
curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/users/videos -XGET; echo ""
```
- Returns: All the user's videos.
```
{
  "videos":
  [{
    "videoName":"Trial #1 Video",
    "category":"Programming",
    "userId":"631e0e61e3a5f0219ea3059e",
    "uploadDate":"2022-09-11T17:49:56.870Z",
    "description":"This is a video trial to see if a vide can be installed",
    "embedVideo":"https://www.youtube.com/embed/6tNS--WetLI",
    "userName":"Samra",
    "videoThumbnail":"https://i.ytimg.com/vi/6tNS--WetLI/hqdefault.jpg",
    "stats":
      {
        "viewCount":"1011400",
        "likeCount":"19725",
        "commentCount":"0"
      },
    "comments":[],
    "ratings":[],
    "avgRating":0,
    "_id":"631e1fc79fbea132961d6574"
  }]
}
```

<p>If there are no videos related to a user</p>

- Returns: an empty list. 
```
{"videos":[]}
```
---
<h3>Videos in database</h3>

`GET '/api/videos'`

- This will show all videos by all users.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request body: None.

<p>Example:</p>

```
 curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/videos -XGET; echo ""
```
- Returns: All the videos by all users.
```
{
  "videos":
  [{
    "videoName":"Trial #1 Video",
    "category":"Programming",
    "userId":"631e0e61e3a5f0219ea3059e",
    "uploadDate":"2022-09-11T17:49:56.870Z",
    "description":"This is a video trial to see if a vide can be installed",
    "embedVideo":"https://www.youtube.com/embed/6tNS--WetLI",
    "userName":"Samra",
    "videoThumbnail":"https://i.ytimg.com/vi/6tNS--WetLI/hqdefault.jpg",
    "stats":
      {
        "viewCount":"1011400",
        "likeCount":"19725",
        "commentCount":"0"
      },
    "comments":[],
    "ratings":[],
    "avgRating":0,
    "_id":"631e1fc79fbea132961d6574"
  }]
}
```
- N.B This results seems to resemble the videos of a user. The reason for this is we only have one user on our database and it is for conserving space. 

<p>If no video exists in the database</p>

- Returns: error message and status code 404.
```
{ error: 'No Videos Available' }
```

---
<h3>Get a video</h3>

`GET '/api/videos/${id}'`

- This will show all the information of a specific video.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request Arguments: Id of the video.
- Request body: None.

<p>Example:</p>

```
curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/videos/631e1fc79fbea132961d6574 -XGET; echo ""
```
- Returns: All of the information of a specific video.
```
{
  "video":
    {
      "_id":"631e1fc79fbea132961d6574",
      "videoName":"Trial #1 Video",
      "category":"Programming",
      "userId":"631e0e61e3a5f0219ea3059e",
      "uploadDate":"2022-09-11T17:49:56.870Z",
      "description":"This is a video trial to see if a vide can be installed",
      "embedVideo":"https://www.youtube.com/embed/6tNS--WetLI",
      "userName":"Samra",
      "videoThumbnail":"https://i.ytimg.com/vi/6tNS--WetLI/hqdefault.jpg",
      "stats":
        {
          "viewCount":"1011400",
          "likeCount":"19725",
          "commentCount":"0"
        },
      "comments":[],
      "ratings":[],
      "avgRating":0
    }
}
```
<p>If a video by that id doesn't exist</p>

- Returns: error message and status code 404.
```
{ error: 'Video Doesn't exist' }
```
---
<h3>Get category</h3>

`GET '/api/categories/{$name}'`

- This will show all the information of a category.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request Arguments: Name of a category.
- Request body: None.

<p>Example:</p>

```
curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/categories/Programming -XGET; echo ""
```
- Returns: All of the information of a category.
```
{
  "videos":
  [{
    "videoName":"Trial #1 Video",
    "category":"Programming",
    "userId":"631e0e61e3a5f0219ea3059e",
    "uploadDate":"2022-09-11T17:49:56.870Z",
    "description":"This is a video trial to see if a vide can be installed",
    "embedVideo":"https://www.youtube.com/embed/6tNS--WetLI",
    "userName":"Samra",
    "videoThumbnail":"https://i.ytimg.com/vi/6tNS--WetLI/hqdefault.jpg",
    "stats":
    {
      "viewCount":"1011400",
      "likeCount":"19725",
      "commentCount":"0"
    },
    "comments":[],
    "ratings":[],
    "avgRating":0,
    "_id":"631e1fc79fbea132961d6574"
  }]
}
```
- N.B This results seems to resemble the videos of a user. The reason for this is we only have one user on our database and it is for conserving space. When you have a lot of users, all the programming videos will be listed together.

<p>If a category doesn't exist</p>

- Returns: error message and status code 404.
```
{ error: 'Category Doesn't exist' }
```
---
<h3>Delete a video</h3>

`DELETE '/api/videos/{$id}'`

- This will delete a video from video database, user's video list and category's video list.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request Arguments: Id of a Video.
- Request body: None.

<p>Example:</p>

```
curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/videos/631e1fc79fbea132961d6574 -XDELETE; echo""
```
- Returns: Successful message of deletion.
```
{"message":"Video Deleted"}
```
<p>If the given ID of the video doesn't exist</p>

- Returns: error message and status code 404.
```
{"error":"Video Doesn't exist"}
```
---
<h3>Logout a user</h3>

`DELETE '/api/logout'`

- This will logout a user and delete it's session/ token.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request body: None.

<p>Example:</p>

```
curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/logout -XDELETE; echo ""
```
- Returns: Successful message of logging off.
```
{"message":"GoodBye"}
```
---
<h3>Delete a user</h3>

`DELETE '/api/users/flush'`

- This will delete a user and all the user's video from the video database and category's list.
- Request Cookie:
```
cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c"
```
- Request body: None.

<p>Example:</p>

```
curl --cookie "auth_key=6d8d4e13-00ad-4c1e-8d06-6142cd39be2c" 0.0.0.0:5001/api/users/flush -XDELETE; echo ""
```
- Returns: Successful message of deleting a user.
```
{"message":"User Deleted"}
```
<p>If the given cookie is wrong</p>

- Returns: error message with status code 401.
```
{ error: 'User does not exist' }
```
---
