const {Router} = require("express");
const indexRouter = Router();
indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.loadMainPage);

module.exports = indexRouter;