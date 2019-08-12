# User Auth Server

Basic login and register authentication REST API service using Node, Express and Mongodb


## Build components
create mongodb 'user-security' with collections 'users'
npm i express bcryptjs is-empty jsonwebtoken passport passport-jwt validator cors

## nodemon for auto restart
npm install --save-dev nodemon

`package.json` switich to nodemon
```
"scripts": {
    "dev": "NODE_ENV=dev nodemon server.js",
    "test": "NODE_ENV=test node server.js",
    "start": "node server.js"
  },
```

