const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("uploads/avatars")})
/* requerir las validaciones */

module.exports = [upload.any()]