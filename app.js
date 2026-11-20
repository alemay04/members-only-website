const express = require("express");
const path = require("node:path");
const app = express();
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: false}));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", indexRouter);

app.listen(3000, (err) =>{
    if(err){
        console.log(err);
    }
    console.log("Serveur en marche");
});