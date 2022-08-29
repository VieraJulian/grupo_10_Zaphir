const {user}  = require("../database/models/index");

const recordame = async(req, res, next) => {

    if (req.cookies.recordame != undefined && req.session.user == undefined) {
        let users = await user.findAll()
        let userDB = users.find(u => u.email === req.cookies.recordame)
        delete userDB.password
        req.session.user = userDB
    }

    next();

}

module.exports = recordame