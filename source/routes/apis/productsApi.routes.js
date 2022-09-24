const { Router } = require("express");
const router = Router();
const { count, one } = require("../../controllers/apis/productsApi");

router.get("/", count);
router.get("/:id", one);

module.exports = router