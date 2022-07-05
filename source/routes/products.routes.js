const {Router} = require("express");
const router = Router();
const {create, edit, carrito, detalle, productos} = require("../controllers/products.controllers");
router.get("/", productos)
router.get("/crear", create);
router.get("/editar", edit);
router.get("/carrito", carrito);
router.get("/detalle", detalle)
module.exports = router;