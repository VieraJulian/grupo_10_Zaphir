const isLoggedButNot = (req, res, next) => {

    if (req.session && req.session.user) {
        res.redirect("/");
    }

    next();
}

module.exports = [isLoggedButNot]