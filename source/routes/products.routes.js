const {Router} = require("express");
const router = Router();
const {create, edit} = require("../controllers/products.controllers");
router.get("/crear", create);
router.get("/editar", edit);
module.exports = router;