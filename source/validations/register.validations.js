const { body } = require('express-validator')
const { index } = require('../models/users.model')

const register = [
    body("nombre").notEmpty().withMessage("El nombre no puede quedar vacío").bail().isLength({min : 2}).withMessage("El nombre debe contener mínimo dos caracteres").bail(),
    body("email").notEmpty().withMessage("El email no puede quedar vacío").bail().isEmail().withMessage('El formato de email no es válido').bail().custom(value => {
        let users = index()
        users = users.map(u => u.email)
        if(users.includes(value)){
            throw new Error('El email ya está registrado')
        }
        return true
    }),    
    body("password").notEmpty().withMessage("La contraseña no puede quedar vacío").bail().isLength({min : 4}).withMessage("La contraseña debe contener mínimo cuatro caracteres").bail(),
    body("passwordConfirm").notEmpty().withMessage("La contraseña no puede quedar vacío").bail().isLength({min : 4}).withMessage("La contraseña debe contener mínimo cuatro caracteres").bail().custom((value, { req } )=> {
        let { password } = req.body
        if(password !== value){
            throw new Error("La contraseña no coincide")
        }
        return true
    })
]

module.exports = register