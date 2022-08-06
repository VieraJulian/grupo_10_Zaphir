const { validationResult } = require('express-validator');
const { index, create, write } = require('../models/users.model');

const usersControllers = {
    register: (req, res) => res.render("users/register", {
        title: "Crear cuenta",
        styles: ["users/register-mobile"],
    }),
    login: (req, res) => res.render("users/login", {
        title: "Iniciar sesión",
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
        let users = index()
        let user = users.find(u => u.email === req.body.email)
        delete user.password
        req.session.user = user
        return res.redirect("/usuario/perfil")
    },
    profile: (req, res) => {
        return res.render("users/profile", {
            styles: ["users/profile-mobile", "users/profile-tablets", "users/profile-desktop"],
            title: "Mi Perfil"
        })
    },
    logout: (req, res) => {
        delete req.session.user
        return res.redirect('/usuario/ingresar')
    },
    editProfile: (req, res) => {
        return res.render("users/edit-profile", {
            title: "Editar Perfil",
            styles: ["users/edit-profile-mobile", "users/edit-profile-tablets", "users/edit-profile-desktop"]
        })
    },
    updateProfile: (req, res) => {
        let validaciones = validationResult(req)
        let { errors } = validaciones
        if (errors && errors.length > 0) {
            return res.render('users/edit-profile', {
                title: "Editar Perfil",
                styles: ["users/edit-profile-mobile", "users/edit-profile-tablets", "users/edit-profile-desktop"],
                oldData: req.body,
                errors: validaciones.mapped()
            });
        }
        let users = index();
        let usersModifieds = users.map(user => {
            if (user.email === req.session.user.email) {
                user.nombre = req.body.nombre;
                user.telefono = req.body.telefono != null ? parseInt(req.body.telefono) : null;
                user.imagen = req.files && req.files.length > 0 ? req.files[0].filename : user.imagen;
            }
            return user;
        })
        write(usersModifieds)
        return res.redirect("/usuario/perfil")
    }
}

module.exports = usersControllers