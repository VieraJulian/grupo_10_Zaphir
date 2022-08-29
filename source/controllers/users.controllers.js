const { validationResult } = require('express-validator');
const { index, create, write } = require('../models/users.model');
const { unlinkSync } = require("fs");
const { resolve } = require("path");
const {user}  = require("../database/models/index");
const { hashSync } = require('bcryptjs');
const { STRING } = require('sequelize');

const usersControllers = {
    register: async(req, res) => res.render("users/register", {
        title: "Crear cuenta",
        styles: ["users/register-mobile"],
    }),
    login: async(req, res) => res.render("users/login", {
        title: "Iniciar sesión",
        styles: ["users/login-mobile", "users/login-tablets", "users/login-desktop"],
    }),
    process: async(req, res) => {
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
        req.body.password = hashSync(req.body.password, 10);
        req.bady.isAdmin = String(req.body.email).includes("@zaphir.com");
        /* let newUser = create(req.body)
        let users = index()
        users.push(newUser)
        write(users) */
        await user.create(req.body)
        return res.redirect('/usuario/ingresar')
    },
    access: async(req, res) => {
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
        let users = await user.findAll()
        let userDB = users.find(u => u.email === req.body.email)
        delete userDB.password
        req.session.user = userDB

        if (req.body.recordame != undefined) {
            res.cookie("recordame", userDB.email, { maxAge: 60000 * 60 })
        }

        return res.redirect("/")
    },
    profile: async(req, res) => {
        let users = await user.findAll()
        let userDB = users.find(u => u.email === req.session.user.email)
        return res.render("users/profile", {
            styles: ["users/profile-mobile", "users/profile-tablets", "users/profile-desktop"],
            title: "Mi Perfil",
            user: userDB
        })
    },
    logout: async(req, res) => {
        res.clearCookie("recordame")
        delete req.session.user
        return res.redirect('/usuario/ingresar')
    },
    editProfile: async(req, res) => {
        return res.render("users/edit-profile", {
            title: "Editar Perfil",
            styles: ["users/edit-profile-mobile", "users/edit-profile-tablets", "users/edit-profile-desktop"]
        })
    },
    updateProfile: async(req, res) => {
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
                user.telefono = req.body.telefono != null ? parseInt(req.body.telefono) : user.telefono;
                if (req.files && req.files.length > 0 && user.imagen == "default.png") {
                    user.imagen = req.files[0].filename
                } else if (req.files && req.files.length > 0 && user.imagen != "default.png") {
                    unlinkSync(resolve(__dirname, "../../uploads/avatars/" + user.imagen))
                    user.imagen = req.files[0].filename
                } else {
                    user.imagen

                }
            }
            return user;
        })
        write(usersModifieds)
        return res.redirect("/usuario/perfil")
    }
}

module.exports = usersControllers