const { user } = require('../database/models/index')
const middleware = async (req, res, next) => {

    let users = null;

    if(req.cookies && req.cookies.username){
        let user = await user.findAll()
        user = users.find(user => user.username == req.cookies.username)
        req.session.user = user
    }

    if (req.session && req.session.user) {
        users = req.session.user
    }

    res.locals.user = user

    return next()
}
module.exports = middleware