const { Router } = require("express");
const router = Router();

<<<<<<< HEAD
const { login, register, process, access, profile, logout } = require("../controllers/users.controllers");
=======
const { login, register, process, access, profile, editProfile } = require("../controllers/users.controllers");
>>>>>>> e744a431c5d2d7061944649088dd897f588d92cc

const middlewareRegister = require('../middlewares/register.middlewares');
const middlewareLogin = require('../middlewares/login.middlewares');

router.get("/registro", register);
router.post("/registro", middlewareRegister, process)

router.get("/ingresar", login);
router.post("/ingresar", middlewareLogin, access)

router.get('/logout', isLogged, logout)

router.get("/perfil", profile);
router.get("/perfil/editar", editProfile)

module.exports = router;