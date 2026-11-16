

async function loadMainPage(req, res) {
    res.render("mainPage", {title : "HomePage"});
}

function loadSignUp(req, res){
    res.render("signUp", {title : "Sign Up Page"});
}

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
    loadMember
};