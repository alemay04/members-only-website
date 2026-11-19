const { body, validationResult, matchedData } = require("express-validator");
const {validateUser} = require("../controllers/validationCriterias/signUpValidator");
const bcrypt = require("bcryptjs");
const db = require("../database/queries");

function loadMainPage(req, res) {
    res.render("mainPage", {title : "HomePage"});
}

function loadSignUp(req, res){
    res.render("signUp", {title : "Sign Up Page"});
}

const registerUser = [validateUser, async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", {
        title: "Sign Up Page",
        errors: errors.array(),
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

module.exports = {
    loadMainPage,
    loadSignUp,
    loadLogin,
    loadMember,
    registerUser
};