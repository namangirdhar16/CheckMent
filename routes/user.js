const express = require("express");
const Router = new express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");


Router.get("/sign-up", userController.signUp);
Router.get("/sign-in", userController.signIn);
Router.post("/create", userController.create);
Router.get("/sign-out", userController.destroySession);

// use passport as a middleware to authenticate
Router.post("/create-session", passport.authenticate(
    'local',
    {failureRedirect: "/user/sign-in"}), userController.createSession)

module.exports = Router;