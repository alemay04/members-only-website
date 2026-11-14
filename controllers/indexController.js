

async function loadMainPage(req, res) {
    res.render("mainPage", {title : "HomePage"})
}

module.exports = {
    loadMainPage
};