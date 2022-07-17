const { index, create, write, one } = require("../models/products.models")

module.exports = {
    create: (req, res) => {
        res.render("products/create", {
            title: "Nuevo producto",
            styles: ["products/create-mobile"],
        })
    },

    save: (req, res) => {
        let acumulador = [];
        for(let index = 0; index < req.files.length; index++) {
            acumulador.push(req.files[index].filename);
        }
        req.body.imagen = acumulador
        let products = index();
        let newProduct = create(req.body);
        products.push(newProduct);
        write(products)
        res.redirect("/productos")
    },

    edit: (req, res) => {
        let product = one(parseInt(req.params.id))

        if(!product){
            return res.redirect("/productos")
        }

        return res.render("products/edit", {
            title: "Editar producto",
            styles: ["products/edit-mobile"],
            product: product
        })
    },

    modify: (req, res) => {
        let acumulador = [];
        for(let index = 0; index < req.files.length; index++) {
        acumulador.push(req.files[index].filename);
        }
        let products = index();
        let product = one(parseInt(req.params.id))
        let productsModifieds = products.map(p =>{
            if(p.id === product.id){
                p.nombre = req.body.nombre;
                p.descripcion = req.body.descripcion;
                p.categoria = req.body.categoria;
                p.colores = req.body.colores;
                p.talle = req.body.talle;
                p.stock = parseInt(req.body.stock);
                p.precio = parseInt(req.body.precio);
                p.imagen = req.files && req.files.length > 0 ? acumulador : p.imagen;
            }
            return p
        })
        write(productsModifieds)
        return res.redirect("/productos")
    },

    carrito: (req, res) => res.render("products/carrito", {
        title: "Carrito de compras",
        styles: ["products/carrito-mobile", "products/carrito-tablets", "products/carrito-desktop"]
    }),

    detalle: (req, res) => res.render("products/detalle", {
        title: "Detalle de producto",
        styles: ["products/detalle-mobile", "products/detalle-tablets", "products/detalle-desktop"]
    }),

    productos: (req, res) => res.render("products/productos", {
        title: "Zaphir",
        styles: ["products/productos-mobile", "products/productos-tablets", "products/productos-desktop"],
        products: index()
    })
}