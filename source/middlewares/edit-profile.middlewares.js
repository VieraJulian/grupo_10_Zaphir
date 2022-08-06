const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("uploads/avatars")})
const editProfileValidation = require("../validations/edit.profile.validation")

module.exports = [upload.any(), editProfileValidation]