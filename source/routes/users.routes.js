const { Router } = require("express");
const router = Router();

const { login, register, process, access, profile } = require("../controllers/users.controllers");

const middlewareRegister = require('../middlewares/register.middlewares');
const middlewareLogin = require('../middlewares/login.middlewares');
router.get("/registro", register);
router.post("/registro", middlewareRegister, process)

router.get("/ingresar", login);
router.post("/ingresar", middlewareLogin, access)

router.get("/perfil", profile);

module.exports = router;