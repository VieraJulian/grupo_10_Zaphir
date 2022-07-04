const {static} = require("express");
const {resolve} = require("path");
const public = resolve(__dirname, "../../public");
module.exports = static(public);