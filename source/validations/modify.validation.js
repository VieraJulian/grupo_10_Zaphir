const { body } = require("express-validator");
const { resolve, extname } = require("path");
const { unlinkSync } = require("fs");

const modify = [
    body("nombre").notEmpty().withMessage("El nombre no puede quedar vació").bail().isLength({ min: 5 }).withMessage("El nombre debe contener mínimo cinco caracteres").bail(),
    body("descripcion").notEmpty().withMessage("La descripción no puede quedar vacía").bail().isLength({ min: 20 }).withMessage("El nombre debe contener mínimo veinte caracteres").bail(),
    body("imagen").custom((value, { req }) => {
        let imagen = req.files;
        if (!imagen || imagen.length == 0) {
            return true
        }
        if (imagen.length < 4) {
            imagen.forEach(i => {
                unlinkSync(resolve(__dirname, "../../public/assets/productos/" + i.filename))
            });
            throw new Error("Debes subir cuatro imagenes")
        }
        if (imagen.length > 4) {
            imagen.forEach(i => {
                unlinkSync(resolve(__dirname, "../../public/assets/productos/" + i.filename))
            });
            throw new Error("Subiste demasiadas imagenes")
        }

        let extensiones = [".svg", ".jpg", ".png", ".jpeg", ".gif"]
        let extension = imagen.map(i => {
            return extname(i.filename)
        });

        extension.forEach(e => {
            if (!extensiones.includes(e)) {
                imagen.forEach(i => {
                    unlinkSync(resolve(__dirname, "../../public/assets/productos/" + i.filename))
                });
                throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg', '.gif'")
            }
        })

        imagen.forEach(i => {
            if (i.size > 2097152) {
                imagen.forEach(image => {
                    unlinkSync(resolve(__dirname, "../../public/assets/productos/" + image.filename))
                });
                throw new Error("La imagen supera el peso de 2MB");
            }
        })

        return true
    }),
    body("categoria").notEmpty().withMessage("Tienes que seleccionar una opción").bail(),
    body("color").notEmpty().withMessage("El color no puede quedar vació").bail().custom(value => {
        let colores = value.split(",");

        if (colores.length > 12) {
            throw new Error("Los colores no pueden ser más de doce");
        }
        
        colores.forEach(c => {
            if (c.length < 3) {
                throw new Error("Los colores deben tener más de tres caracteres");
            }
        })

        return true
    }),
    body("talle").notEmpty().withMessage("El talle no puede quedar vació").bail().custom(value => {
        let talles = value.split(",");

        if (talles.length > 6) {
            throw new Error("Los talles no pueden ser más de seis");
        }
        
    
        return true
    }),
    body("stock").notEmpty().withMessage("El stock no debe quedar vació").bail().isNumeric().withMessage("El stock debe ser un numero").bail().custom(value => {
        if (value <= 0) {
            throw new Error("El stock debe ser mayor a cero");
        }
        return true
    }),
    body("precio").notEmpty().withMessage("El precio no debe quedar vació").bail().isNumeric().withMessage("El precio debe ser un numero").bail().custom(value => {
        if (value <= 0) {
            throw new Error("El precio debe ser mayor a cero");
        }
        return true
    })
]

module.exports = modify;