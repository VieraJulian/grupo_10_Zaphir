const { Router } = require("express");
const router = Router();

const { login, register, process, access, profile, logout, editProfile, updateProfile } = require("../controllers/users.controllers");

const middlewareRegister = require('../middlewares/register.middlewares');
const middlewareLogin = require('../middlewares/login.middlewares');
const middlewaresEditProfile = require('../middlewares/edit-profile.middlewares');

const isLogged = require("../middlewares/isLogged"); /* Meli, te falto esto, por eso te tiraba error*/


router.get("/registro", register);
router.post("/registro", middlewareRegister, process)

router.get("/ingresar", login);
router.post("/ingresar", middlewareLogin, access)

router.get('/logout', isLogged, logout)

router.get("/perfil", profile);
router.get("/perfil/editar", editProfile);
router.put("/perfil/editar",middlewaresEditProfile, updateProfile)

module.exports = router;