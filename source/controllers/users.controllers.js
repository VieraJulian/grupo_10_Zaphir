const { validationResult } = require('express-validator');
const { user, image } = require("../database/models/index");
const { hashSync } = require('bcryptjs');
const { unlinkSync } = require("fs");
const { resolve } = require("path");

const usersControllers = {
    register: async (req, res) => res.render("users/register", {
        title: "Crear cuenta",
        styles: ["users/register-mobile"],
    }),
    login: async (req, res) => res.render("users/login", {
        title: "Iniciar sesión",
        styles: ["users/login-mobile", "users/login-tablets", "users/login-desktop"],
    }),
    process: async (req, res) => {
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
        req.body.isAdmin = String(req.body.email).includes("@zaphir.com");
        let avatar = await image.create({
            imagen: "default.png"
        })
        req.body.imagen = avatar.id;
        if (req.body.telefono) {
            req.body.telefono
        } else {
            req.body.telefono = null
        }
        await user.create(req.body)
        return res.redirect('/usuario/ingresar')
    },
    access: async (req, res) => {
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
        let users = await user.findAll({
            include: [
                { association: "image" }
            ]
        })
        let userDB = users.find(u => u.email === req.body.email)
        delete userDB.password; // esto no funciona
        req.session.user = userDB

        if (req.body.recordame != undefined) {
            res.cookie("recordame", userDB.email, { maxAge: 60000 * 60 })
        }
        return res.redirect("/")
    },
    profile: async (req, res) => {
        let users = await user.findAll({
            include: [
                { association: "image" }
            ]
        })
        let userDB = users.find(u => u.email === req.session.user.email)
        return res.render("users/profile", {
            styles: ["users/profile-mobile", "users/profile-tablets", "users/profile-desktop"],
            title: "Mi Perfil",
            user: userDB
        })
    },
    logout: async (req, res) => {
        res.clearCookie("recordame")
        delete req.session.user
        return res.redirect('/usuario/ingresar')
    },
    editProfile: async (req, res) => {
        return res.render("users/edit-profile", {
            title: "Editar Perfil",
            styles: ["users/edit-profile-mobile", "users/edit-profile-tablets", "users/edit-profile-desktop"]
        })
    },
    updateProfile: async (req, res) => {
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
        let users = await user.findAll({
            include: [
                { association: "image" }
            ]
        })
        let userDB = users.find(u => u.email === req.session.user.email)
        if (req.files && req.files.length > 0 && userDB.image.imagen == "default.png") {
            let avatar = await image.update({
                imagen: req.files[0].filename
            }, {
                where: {
                    id: userDB.imagen
                }
            })
            req.body.imagen = avatar.id
        } else if (req.files && req.files.length > 0 && userDB.image.imagen != "default.png") {
            let avatar = await image.update({
                imagen: req.files[0].filename
            }, {
                where: {
                    id: userDB.imagen
                }
            })
            unlinkSync(resolve(__dirname, "../../uploads/avatars/" + userDB.image.imagen))
            req.body.imagen = avatar.id
        }
        let userUpdate = await userDB.update(req.body)
        if (req.files && req.files.length > 0) {
            req.session.user = userUpdate;
            req.session.user.image.imagen = req.files[0].filename
        } else {
            req.session.user = userUpdate;
        }

        return res.redirect("/usuario/perfil")
    }
}

module.exports = usersControllers