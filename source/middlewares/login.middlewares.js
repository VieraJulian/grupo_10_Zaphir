const loginValidations = require("../validations/login.validation")
const userLogin = require("./user");

module.exports = [loginValidations, userLogin];
