//indexController.js
const { body, validationResult, matchedData } = require("express-validator");
const {validateUser} = require("../controllers/validationCriterias/signUpValidator");
const bcrypt = require("bcryptjs");
const db = require("../database/queries");

async function loadMainPage(req, res) {
    const messages = await db.getAllMessages();

    res.render("mainPage", {title : "HomePage", messages : messages});
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
    res.redirect("/login");

}];

function loadLogin(req, res){
    res.render("login", {title : "Login Page"});
}

function loadMember(req, res){
    res.render("memberPage", {title : "Who are you ?"});
}

async function acceptMember(req, res){
    if (req.body.password == "fidelio"){
        const userId = req.user.userid;
        await db.acceptedMember(userId)
        res.redirect("/");
    }
    else if(req.body.password == 'Sri Jayawardenapura Kotte'){
        const userId = req.user.userid;
        await db.acceptedAdmin(userId)
        res.redirect("/");
    }
    else{
        res.redirect("/member");
    }
}

function loginOut(req, res, next){
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/");
    }); 
}

function loadMessageForm(req, res){
    res.render("messageForm", {title : "Message Form Page"});
}

async function registerMessage(req, res){
    const title = req.body.title;
    const message = req.body.message;
    const userId = req.user.userid;

    await db.registerMessage(title, message, userId);
    res.redirect("/");
}

async function deleteMessage(req, res){
    const id = req.params.id;
    await db.deleteMessage(id);
    res.redirect("/");
}

module.exports = {
    loadMainPage,
    loadSignUp,
    loadLogin,
    loadMember,
    registerUser,
    acceptMember,
    loginOut,
    loadMessageForm,
    registerMessage,
    deleteMessage
};