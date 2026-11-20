const pool = require("./pool");

async function registerUser(firstName, lastName, userName, password){
    await pool.query(
        "INSERT INTO users (first_name, last_name, username, password, member_ship_status) VALUES ($1, $2, $3, $4, $5)",[firstName, lastName, userName, password, "non-user" ]
    );
}

async function acceptedMember(){
}

module.exports = {
    registerUser,
    acceptedMember
};