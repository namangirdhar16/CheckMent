const express = require("express");
const Router = new express.Router();


Router.use("/user", require("./user"));

module.exports = Router;