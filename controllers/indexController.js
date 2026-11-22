//indexController.js
const { body, validationResult, matchedData } = require("express-validator");
const {validateUser} = require("../controllers/validationCriterias/signUpValidator");
const bcrypt = require("bcryptjs");
const db = require("../database/queries");

function loadMainPage(req, res) {
    console.log(req.user);
    res.render("mainPage", {title : "HomePage", user: req.user});
}

function loadSignUp(req, res){
    res.render("signUp", {title : "Sign Up Page", formData : {}});
}

const registerUser = [validateUser, async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", {
        title: "Sign Up Page",
        errors: errors.array(),
        formData : req.body,
      });
    }
    const {firstName, lastName, userName, password} = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.registerUser(firstName, lastName, userName, hashedPassword);
    res.redirect("/");

}];

function loadLogin(req, res){
    res.render("login", {title : "Login Page"});
}

function loadMember(req, res){
    res.render("memberPage", {title : "Member?"});
}

async function acceptMember(req, res){
    if (req.body.password == "fidelio"){
        console.log("accepted");
        //await db.acceptedMember()
        //res.render()
    }
    else{
        console.log("refused");
    }
    loadMember(req,res);
}

function loginOut(req, res, next){
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/");
    }); 
}

module.exports = {
    loadMainPage,
    loadSignUp,
    loadLogin,
    loadMember,
    registerUser,
    acceptMember,
    loginOut
};