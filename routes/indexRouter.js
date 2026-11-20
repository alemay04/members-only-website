const {Router} = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const { body, validationResult } = require("express-validator");


indexRouter.get("/", indexController.loadMainPage);
indexRouter.get("/signup", indexController.loadSignUp);
indexRouter.get("/login", indexController.loadLogin);
indexRouter.get("/member", indexController.loadMember);

indexRouter.post("/signup", indexController.registerUser);
indexRouter.post("/member", indexController.acceptMember);

module.exports = indexRouter;