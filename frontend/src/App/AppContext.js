import React from "react";

export const defaultUser = {
        "_id": "",
        "username": "Tony",
        "videos": [
          {
            "videoName": "Python",
            "category": "Programming",
            "userId": "630f5876dffb0a4fce2f21e8",
            "uploadDate": "2022-09-05T11:39:17.409Z",
            "description": "tutorials on css",
            "embedVideo": "https://www.youtube.com/embed/yfoY53QXEnI",
            "userName": "Tony",
            "videoThumbnail": "https://i.ytimg.com/vi/yfoY53QXEnI/mqdefault.jpg",
            "stats": {
                "viewCount": "3843475",
                "likeCount": "79803",
                "commentCount": "0"
            },
            "comments": [],
            "ratings": [],
            "avgRating": 0,
            "_id": "6315dfe9b23e18390aef6495"
        }
        ],
        "notes": [],
        "articles": [],
        "ratings": [],
        "avgRating": 0,
        "isLoggedIn": true,
        "token": "null"
}

export const postVideo = () => {}

export const AppContext = React.createContext({
  user: defaultUser,
  postVideo: postVideo
})

