const {Router} = require("express");
const router = Router();
const {home} = require("../controllers/main.controllers");
router.get("/", home);
module.exports = router;