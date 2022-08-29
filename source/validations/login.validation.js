const { body } = require('express-validator')
const {user}  = require("../database/models/index");
const { compareSync } = require("bcryptjs")
const login = [
    body("email").notEmpty().withMessage('El email no puede quedar vacío').bail().isEmail().withMessage('El formato de email no es válido').bail().custom(async(value) => {
        let users = await user.findAll()
        users = users.map(u => u.email)
        if (!users.includes(value)) {
            throw new Error('El email no está registrado')
        }
        return true
    }),
    body('password').notEmpty().withMessage('La contraseña no puede quedar vacía.').bail().isLength({ min: 4 }).withMessage("la contraseña debe contener mínimo cuatro caracteres").bail().custom(async(value, { req }) => {
        let { email } = req.body
        let users = await user.findAll()
        let userDB = users.find(u => u.email === email)

        if (!userDB) {
            throw new Error("Usuario no encontrado")
        }

        if (!compareSync(value, user.password)) {
            throw new Error("La contraseña es incorrecta")
        }

        return true

    })
]
module.exports = login
