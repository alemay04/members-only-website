//indexRouter.js
const {Router} = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

indexRouter.get("/", indexController.loadMainPage);
indexRouter.get("/signup", indexController.loadSignUp);
indexRouter.get("/login", indexController.loadLogin);
indexRouter.get("/member", indexController.loadMember);
indexRouter.get("/logout", indexController.loginOut);

indexRouter.post("/signup", indexController.registerUser);
indexRouter.post("/member", indexController.acceptMember);
indexRouter.post("/login", 
    passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }))

module.exports = indexRouter;