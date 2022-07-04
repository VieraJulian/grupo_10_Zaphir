module.exports = {
    create: (req, res) => res.render("products/create", {
        title: "Nuevo producto",
        styles: ["products/create-mobile"]
    }),
    edit: (req, res) => res.render("products/edit", {
        title: "Editar producto",
        styles: ["products/edit-mobile"]
    }),
    carrito: (req, res) => res.render("products/carrito", {
        title: "Carrito de compras",
        styles: ["products/carrito-mobile", "products/carrito-tablets", "products/carrito-desktop"]
    })
}