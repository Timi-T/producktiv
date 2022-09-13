#!/bin/bash

# LINTING CHECK FOR BACKEND FILES
#============================================#

# Run eslint on files in main directory
npx eslint server.js

# Run eslint on files in controller directory
npx eslint controllers/UserController.js

# Run eslint on files in dataObjects directory
npx eslint dataObjects/userObject.js
npx eslint dataObjects/videoObject.js

# Run eslint on files in routes directory
npx eslint routes/index.js

# Run eslint on files in utils directory
npx eslint utils/db.js

#============================================#


# LINTING CHECK FOR FRONTEND FILES
#============================================#