module.exports = {
    register: (req, res) => res.render("users/register", {
        title: "Crear cuenta",
        styles: ["users/register-mobile"],
    }),
    login: (req, res) => res.render("users/login", {
        title: "Inicial sesión",
        styles: ["users/login-mobile", "users/login-tablets", "users/login-desktop"], 
    })
}