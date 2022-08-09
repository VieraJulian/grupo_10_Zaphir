const isAdmin = (req, res, next) => {

    if (!req.session.user.isAdmin) {
        return res.redirect("/");
    }

    next();
}

module.exports = isAdmin