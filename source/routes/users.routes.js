const {Router} = require("express");
const router = Router();
const {login, register} = require("../controllers/users.controllers");
router.get("/registro", register);
router.get("/ingresar", login);
module.exports = router;