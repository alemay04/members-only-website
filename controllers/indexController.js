const { body, validationResult, matchedData } = require("express-validator");
const {validateUser} = require("../controllers/validationCriterias/signUpValidator");

function loadMainPage(req, res) {
    res.render("mainPage", {title : "HomePage"});
}

function loadSignUp(req, res){
    res.render("signUp", {title : "Sign Up Page"});
}

const registerUser = [validateUser, (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", {
        title: "Sign Up Page",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, userName, password, confirmPassword} = matchedData(req);
    //usersStorage.addUser({ firstName, lastName });
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