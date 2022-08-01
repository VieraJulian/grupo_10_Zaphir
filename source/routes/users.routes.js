const { Router } = require("express");
const router = Router();

const { login, register, process } = require("../controllers/users.controllers");

const middlewareRegister = require('../middlewares/register');

router.get("/registro", register);
router.post("/registro", middlewareRegister, process)

router.get("/ingresar", login);

module.exports = router;