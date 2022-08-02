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
    access: (req, res) => {
        let validaciones = validationResult(req)
        let { errors } = validaciones
        if (errors && errors.length > 0) {
            return res.render('users/login', {
                title: "ingresar",
                styles: ["users/login-mobile", "users/login-tablets", "users/login-desktop"],
                oldData: req.body,
                errors: validaciones.mapped()
            });
        }
        return res.redirect('/')
    },
    profile: (req, res) => {
        return res.render("users/profile", {
            styles: ["users/profile-mobile", "users/profile-tablets", "users/profile-desktop"],
            title: "Mi Perfil"
        })
    },
<<<<<<< HEAD
    logout: (req, res) => {
        delete req.session.users
        return res.redirect('/')
=======
    editProfile: (req, res) => {
        return res.render("users/edit-profile", {
            title: "Editar Perfil",
            styles: ["users/edit-profile-mobile","users/edit-profile-tablets", "users/edit-profile-desktop"]
        })
>>>>>>> e744a431c5d2d7061944649088dd897f588d92cc
    }
}

module.exports = usersControllers