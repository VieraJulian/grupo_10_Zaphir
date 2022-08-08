const { Router } = require("express");
const router = Router();
const { create, edit, carrito, detalle, productos, save, modify, destroid, ofertas, favoritos, allProducts } = require("../controllers/products.controllers");

const multer = require("multer");
const storage = require("../modules/storage")
const upload = multer({ storage: storage("public/assets/productos") });

const isAdmin = require("../middlewares/isAdmin");
const isLogged = require("../middlewares/isLogged");

router.get("/crear", [isLogged, isAdmin], create);
router.post("/crear", [upload.any()], save)

router.get("/editar/:id", [isLogged, isAdmin], edit);
router.put("/editar/:id", [upload.any()], modify);

router.get("/vistas", [isLogged, isAdmin], allProducts)

router.get("/favoritos", [isLogged], favoritos)

router.get("/carrito", isLogged, carrito);

router.get("/detalle/:id", detalle);

router.get("/ofertas", ofertas)

router.get("/:categorias?", productos);
router.get("/:talle?", productos);
router.get("/:color?", productos);
router.get("/:range-precio?", productos);

router.delete('/delete/:id', destroid);

module.exports = router;