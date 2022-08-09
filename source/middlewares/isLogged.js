const isLogged = (req, res, next) => {

    if (req.session && req.session.user) {
        return next()
    }

    return res.redirect('/usuario/ingresar')
}

module.exports = isLogged