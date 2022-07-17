const {Router} = require("express");
const router = Router();
const {create, edit, carrito, detalle, productos, save} = require("../controllers/products.controllers");

const multer = require("multer");
const storage = require("../modules/storage")
const upload = multer({ storage: storage("public/assets/productos") });

router.get("/", productos);

router.get("/crear", create);
router.post("/crear", [upload.any()], save)

router.get("/editar", edit);
router.get("/carrito", carrito);
router.get("/detalle", detalle);

module.exports = router;