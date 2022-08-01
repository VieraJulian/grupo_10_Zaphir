const { validationResult } = require('express-validator');
const { index, create, write } = require('../models/users.model');

const usersControllers = {
    register: (req, res) => res.render("users/register", {
        title: "Crear cuenta",
        styles: ["users/register-mobile"],
    }),
    login: (req, res) => res.render("users/login", {
        title: "Inicial sesión",
        styles: ["users/login-mobile", "users/login-tablets", "users/login-desktop"],
    }),
    process: (req, res) => {
        let validaciones = validationResult(req)
        let { errors } = validaciones
        if (errors && errors.length > 0) {
            return res.render('users/register', {
                title: "Crear cuenta",
                styles: ["users/register-mobile"],
                oldData: req.body,
                errors: validaciones.mapped()
            });
        }
        let newUser = create(req.body)
        let users = index()
        users.push(newUser)
        write(users)
        return res.redirect('/usuario/ingresar')
    },
    access:(req, res) => {
        let validaciones = validationResult(req)
        let {errors} = validaciones
        if(errors && errors.length > 0){
        return res.render('users/register',{
        title: "ingresar",
        styles:["users/login-mobile","users/login-tablets","users/login-desktop"],
        oldData: req.body,
        errors: validaciones.mapped()
        });
        }

        return res.redirect('/')

    }
}

module.exports = usersControllers