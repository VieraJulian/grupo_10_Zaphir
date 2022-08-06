const isAdmin = (req, res, next) => {

    if(req.session.user && req.session.user.isAdmin) {
        next();
    }

    return res.redirect("/");
}

module = [isAdmin]