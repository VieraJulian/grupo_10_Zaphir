const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("uploads/avatars")})
const editProfileVlidation = require("../validations/edit.profile.validation")

module.exports = [upload.any(), editProfileVlidation]