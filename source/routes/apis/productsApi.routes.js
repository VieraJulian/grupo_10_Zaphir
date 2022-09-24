const { Router } = require("express");
const router = Router();
const { count } = require("../../controllers/apis/productsApi");

router.get("/", count);

module.exports = router