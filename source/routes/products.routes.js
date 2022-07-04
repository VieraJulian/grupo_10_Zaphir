const {Router} = require("express");
const router = Router();
const {create, edit, carrito} = require("../controllers/products.controllers");
router.get("/crear", create);
router.get("/editar", edit);
router.get("/carrito", carrito)
module.exports = router;