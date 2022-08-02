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
    logout: (req, res) => {
        delete req.session.user
        return res.redirect('/')
    },
    editProfile: (req, res) => {
        return res.render("users/edit-profile", {
            title: "Editar Perfil",
            styles: ["users/edit-profile-mobile", "users/edit-profile-tablets", "users/edit-profile-desktop"]
        })
    },
    updateProfile: (req, res) => {
        

        /* modify: (req, res) => {
            let imagenes = req.files.map(file => file.filename)
            let products = index();
            let product = one(parseInt(req.params.id))
            function porciento(precio, descuento){
                let resultadoDivision = precio / descuento
                return (100 / resultadoDivision).toFixed(1)
            }
            let productsModifieds = products.map(p => {
                if (p.id === product.id) {
                    p.nombre = req.body.nombre;
                    p.descripcion = req.body.descripcion;
                    p.categoria = req.body.categoria;
                    p.colores = req.body.colores;
                    p.talle = req.body.talle;
                    p.stock = parseInt(req.body.stock);
                    p.precio = parseInt(req.body.precio);
                    p.imagen = req.files && req.files.length > 0 ? imagenes : p.imagen;
                    p.descuento = parseInt(req.body.descuento);
                    p.precioFinal = parseInt(req.body.precio - req.body.descuento),
                    p.porciento = parseInt(porciento(req.body.precio, req.body.descuento))
                }
                return p
            })
            write(productsModifieds)
            return res.redirect("/productos")
        }, */
    }
}

module.exports = usersControllers