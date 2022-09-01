import React from "react";

export const defaultUser = {
        "_id": "",
        "username": "Tony",
        "videos": [],
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

