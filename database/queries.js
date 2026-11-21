//queries.js
const pool = require("./pool");

async function registerUser(firstName, lastName, userName, password){
    await pool.query(
        "INSERT INTO users (first_name, last_name, username, password, member_ship_status) VALUES ($1, $2, $3, $4, $5)",[firstName, lastName, userName, password, "non-user" ]
    );
}

async function acceptedMember(){
}

async function getUserInfoWithUsername(username){
    const {rows} = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    return user;
}

async function getUserInfoWithID(id){
    const {rows} = await pool.query("SELECT * FROM users WHERE userid = $1", [id]);
    const user = rows[0];

    return user;
}

module.exports = {
    registerUser,
    acceptedMember,
    getUserInfoWithUsername,
    getUserInfoWithID
};