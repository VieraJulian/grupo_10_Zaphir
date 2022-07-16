const { static } = require("express");
const { resolve } = require("path");
const upload = resolve(__dirname, "../../uploads");
module.exports = static(upload);