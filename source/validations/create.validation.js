const { body } = require("express-validator");
const { resolve } = require("path");
const { unlinkSync } = require("fs");

const create = [
    body("nombre").notEmpty().withMessage("El nombre no puede quedar vacío").bail().isLength({ max: 35 }).withMessage("El nombre debe tener menos de 35 carateres").bail(),
    body("descripcion").notEmpty().withMessage("La descripción no puede quedar vacía").bail().isLength({ max: 250 }).withMessage("La descripción debe tener menos de 250 carateres").bail(),
    body("imagen").custom((value, { req }) => {
        let archivos = req.files;
        if (!archivos || archivos.length == 0) {
            throw new Error("No se subió ninguna imagen")
        }
        if (archivos && !archivos.length >= 4) {
            for (let index = 0; index < archivos.length; index++) {
                return unlinkSync(resolve(__dirname, "../../public/assets/productos/" + archivos[0].filename))
            }
            throw new Error("Debe subir cuatro imagenes")

        }
        /* let extensiones = [".svg", ".jpg", ".png", ".jpeg"]
        let avatar = archivos[0]
        let extension = extname(imagen.filename)
        if (!extensiones.includes(extension)) {
            unlinkSync(resolve(__dirname, "../../uploads/avatars/" + imagen.filename))
            throw new Error("La extension debería ser '.svg', '.jpg', '.png', '.jpeg'")
        }
        if (imagen.size > 2097152) {
            unlinkSync(resolve(__dirname, "../../uploads/avatars/" + imagen.filename))
            throw new Error("La imagen supera el peso de 2MB");
        } */

        return true
    }),
    body("categoria").notEmpty().withMessage("La categoria no puede quedar vacía").bail().isLength({ max: 30 }).withMessage("La categoria debe tener menos de 30 carateres").bail(),
    body("colores").notEmpty().withMessage("El color no puede quedar vacío").bail().isLength({ max: 30 }).withMessage("El color debe tener menos de 30 carateres").bail(),
    body("talle").notEmpty().withMessage("El talle no puede quedar vacío").bail().isLength({ max: 10 }).withMessage("El talle debe tener menos de 10 carateres").bail(),
    body("stock").notEmpty().withMessage("El stock no puede quedar vacío").bail().isNumeric().withMessage("El stock debe ser un número").bail().isLength({ max: 999999 }).withMessage("El stock debe ser menor a 999999").bail(),
    body("precio").notEmpty().withMessage("El precio no puede quedar vacío").bail().isNumeric().withMessage("El precio debe ser un número").bail().isLength({ max: 999999 }).withMessage("El precio debe ser menor a 999999").bail(),
    body("descuento").notEmpty().withMessage("El descuento no puede quedar vacío").bail().isNumeric().withMessage("El descuento debe ser un número").bail().isLength({ max: 99999 }).withMessage("El descuento debe ser menor a 99999").bail()
]

module.exports = create;