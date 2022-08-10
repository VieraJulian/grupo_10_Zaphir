const { index } = require("../models/users.model")

const recordame = (req, res, next) => {

    if (req.cookies.recordame != undefined && req.session.user == undefined) {
        let users = index()
        let user = users.find(u => u.email === req.cookies.recordame)
        delete user.password
        req.session.user = user
    }

    next();

}

module.exports = recordame