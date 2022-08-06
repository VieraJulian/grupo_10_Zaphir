const { body } = require('express-validator')
const { extname, resolve } = require("path");
const { unlinkSync } = require("fs");

const profile = [
    body("imagen").custom((value, {req}) => {
        let imagen = req.files[0];
        if(imagen == undefined){
            return true
        }
        let extensiones = [".svg", ".jpg", ".png", ".jpeg"]
        let extension = extname(imagen.filename)
        if(!extensiones.includes(extension)){
            unlinkSync(resolve(__dirname, "../../uploads/avatars/" + imagen.filename))
            throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg'")
        }
        if(imagen.size > 2097152){
            unlinkSync(resolve(__dirname, "../../uploads/avatars/" + imagen.filename))
            throw new Error("La imagen supera el peso de 2MB");
        }

        return true
    })
]

module.exports = profile