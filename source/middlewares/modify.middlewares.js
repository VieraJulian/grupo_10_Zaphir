const multer = require("multer");
const storage = require("../modules/storage")
const upload = multer({ storage: storage("public/assets/productos") });
const modify = require("../validations/modify.validation")
module.exports = [upload.any(), modify]