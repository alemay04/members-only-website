const express = require("express");
const path = require("node:path");
const app = express();
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter);

app.listen(3000, (err) =>{
    if(err){
        console.log(err);
    }
    console.log("Serveur en marche");
});