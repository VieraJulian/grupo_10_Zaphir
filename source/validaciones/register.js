const {body} = require('express-validator')
const {index} = require('../models/users.model')
const register = [
    body('nombre').notEmpty().withMessage('Este campo  no puede quedar vacío').bail(),
    body('email').notEmpty().withMessage('El email no puede quedar vacío').bail().isEmail().withMessage('El formato de email no es válido').bail().custom(value => {
        let users = index()
        users = users.map(u => u.email)
        if(users.includes(value)){
            throw new Error('El email ya está registrado')
        }
        return true
    }),    
    body('password').notEmpty().withMessage('La contraseña no puede quedar vacía').bail().isLength({min : 6}).bail(),
]
module.exports = register