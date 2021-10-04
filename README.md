# Technobar

## Description
### Technobar is a MERN stack web-app. It helps developers to connect and view the skills of other developers who have registered on this platform. It is deployed on heroku. Go and register now!

## Frontend
### Frontend is build entirely on React. Currently all the components are written in JS and JSX. However I am planning to migrate them to Typescript in future.

## Backend
### Backend is build on NodeJs. All the APIs are created here for communication between frontend and backend. React build files are served in static mannner on the base url. MongoDB is used for database along with mongoose package and deployed on MongoDb cluster.

## Installation
- First clone this repository in your local machine.

  ``` git clone https://github.com/Hitansh-Shah/Technobar.git```
- Make sure you have node, npm and yarn installed on your machine.
- Run the following command to install the dependencies for backend
``` npm install```
- Change directory to /client and install the required packkages for frontend. 

    ``` cd client```    
    ``` yarn install```
- Build the frontend. 

    ```yarn build```
- Go to the root directory of the project. 

    ```cd ..```
- Set the environment variables in ./config/dev.env for the JWT_SECRET for JWT token signature and MONGODB_URL for connection to database.

- Now finally run the project.

    ```npm run dev```

