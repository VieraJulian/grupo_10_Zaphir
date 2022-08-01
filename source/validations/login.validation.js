const { body } = require('express-validator')
const { index } = require('../models/users.model')
const {compareSync}= require("bcryptjs")
const login = [
    body("nombre").notEmpty().withMessage("El nombre no puede quedar vacío").bail().isLength({ min: 2 }).withMessage("El nombre debe contener mínimo dos caracteres").bail().custom(value => {
        let users = index()
        users = users.map(user => user.email)
        if (!users.includes(value)) {
            throw new Error("El email no esta registrado")
        }
        return true
    }),
    body('password').notEmpty().withMessage('La contraseña no puede quedar vacía.').bail().isLength({ min: 4 }).withMessage("la contraseña debe contener mínimo cuatro caracteres").bail().custom((value, { req }) => {
        let { email } = req.body
        let users = index()
        let user = users.find(u => u.email === email)

        if (!user) {
            throw new Error("Usuario no encontrado")
        }

        if (!compareSync(value, user.password)) {
            throw new Error("La contraseña es incorrecta")
        }

        return true

    })
]
module.exports = login