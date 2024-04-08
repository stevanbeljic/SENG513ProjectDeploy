// packages
const express = require("express");
const mariadb = require("mariadb");
const fs = require("fs");
const cors = require("cors");
require('dotenv').config();

// Run the server
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // This line adds JSON parsing middleware
app.use(cors());
app.use('/uploads', express.static('uploads')); //used to access images stored in server

// Get the database connection promise
const getDatabaseConnection = require('./model/model');

getDatabaseConnection.then(databaseConnection => {
  // controllers
  const userController = require("./controllers/user")(databaseConnection);
  const gameController = require("./controllers/game")(databaseConnection);
  const homeController = require("./controllers/home")(databaseConnection);
  const editProfileController = require("./controllers/editProfile")(databaseConnection);
  const viewProfileController = require("./controllers/viewProfile")(databaseConnection);
  const discussionController = require("./controllers/discussion")(databaseConnection);

  // Routes
  app.use("/user", userController);
  app.use("/game", gameController);
  app.use("/", homeController);
  app.use("/editProfile", editProfileController);
  app.use("/viewProfile", viewProfileController);
  app.use("/discussion", discussionController);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
