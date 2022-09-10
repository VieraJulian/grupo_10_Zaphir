const multer = require("multer");
const storage = require("../modules/storage")
const upload = multer({ storage: storage("public/assets/productos") });
const create = require("../validations/create.validation")
module.exports = [upload.any(), create]
