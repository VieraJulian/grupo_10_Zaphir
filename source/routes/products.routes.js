const {Router} = require("express");
const router = Router();
const {create} = require("../controllers/products.controllers");
router.get("/creacion", create);
module.exports = router;