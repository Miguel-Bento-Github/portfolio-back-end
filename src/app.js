require("dotenv").config();
require("../config/db-connection");
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");

const whitelist = [
  "https://www.mr-monkey.net",
  "mr-monkey.net",
  "https://mr-monkey.net/"
];

const corsOptions = function(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    console.log(true);
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptions));

app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res, next) {
  res.json({ msg: "Portfolio Backend" });
});

const projectAPI = require("../api/projects").router;
const contactAPI = require("../api/contact").router;

app.use("/api/project", projectAPI);
app.use("/api/contact", contactAPI);

module.exports = app;
