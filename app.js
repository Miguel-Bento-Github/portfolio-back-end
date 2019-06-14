require("dotenv").config();
require("./config/db-connection");
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const projectAPI = require("./api/projects").router;
const contactAPI = require("./api/contact").router;

app.use("/api/project", projectAPI);
app.use("/api/contact", contactAPI);

module.exports = app;
