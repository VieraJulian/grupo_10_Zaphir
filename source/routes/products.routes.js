const {Router} = require("express");
const router = Router();
const {create, edit, carrito, detalle, productos, save, modify, list } = require("../controllers/products.controllers");

const multer = require("multer");
const storage = require("../modules/storage")
const upload = multer({ storage: storage("public/assets/productos") });

router.get("/crear", create);
router.post("/crear", [upload.any()], save)

router.get("/editar/:id", edit);
router.put("/editar/:id", [upload.any()], modify);

router.get("/carrito", carrito);

router.get("/detalle/:id", detalle);

router.get("/:categorias?", productos);
router.get("/:talle?", productos);
router.get("/:color?", productos);
router.get("/:range-precio?", productos);

module.exports = router;