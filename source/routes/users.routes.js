const { Router } = require("express");
const router = Router();

const { login, register, process, access, profile, logout, editProfile, updateProfile } = require("../controllers/users.controllers");

const middlewareRegister = require('../middlewares/register.middlewares');
const middlewareLogin = require('../middlewares/login.middlewares');
const middlewaresEditProfile = require('../middlewares/edit-profile.middlewares');
const middlewaresLogout = require("../middlewares/logout.middlewares");
const middlewaresProfile = require("../middlewares/profile.middlewares");

const isLoggedButNot = require("../middlewares/isLoggedButNot")

router.get("/registro", isLoggedButNot, register);
router.post("/registro", middlewareRegister, process)

router.get("/ingresar", isLoggedButNot, login);
router.post("/ingresar", middlewareLogin, access)

router.get('/logout', middlewaresLogout, logout)

router.get("/perfil", middlewaresProfile, profile);
router.get("/perfil/editar", middlewaresProfile, editProfile);
router.put("/perfil/editar", middlewaresEditProfile, updateProfile)

module.exports = router;