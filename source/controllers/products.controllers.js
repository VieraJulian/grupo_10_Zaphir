const { index, create, write, one } = require("../models/products.models")

module.exports = {
    create: (req, res) => {
        res.render("products/create", {
            title: "Nuevo producto",
            styles: ["products/create-mobile"],
        })
    },

    save: (req, res) => {
        req.body.imagen = req.files.map(file => file.filename)
        let products = index();
        let newProduct = create(req.body);
        products.push(newProduct);
        write(products)
        res.redirect("/productos")
    },

    edit: (req, res) => {
        let product = one(parseInt(req.params.id))

        if (!product) {
            return res.redirect("/productos")
        }

        return res.render("products/edit", {
            title: "Editar producto",
            styles: ["products/edit-mobile"],
            product: product
        })
    },

    modify: (req, res) => {
        let imagenes = req.files.map(file => file.filename)
        let products = index();
        let product = one(parseInt(req.params.id))
        let productsModifieds = products.map(p => {
            if (p.id === product.id) {
                p.nombre = req.body.nombre;
                p.descripcion = req.body.descripcion;
                p.categoria = req.body.categoria;
                p.colores = req.body.colores;
                p.talle = req.body.talle;
                p.stock = parseInt(req.body.stock);
                p.precio = parseInt(req.body.precio);
                p.imagen = req.files && req.files.length > 0 ? imagenes : p.imagen;
                p.descuento = parseInt(req.body.descuento);
            }
            return p
        })
        write(productsModifieds)
        return res.redirect("/productos")
    },

    productos: (req, res) => {
        
        let products = index();
        
        if (req.query && req.query.name) {
            
            products = products.filter(products => products.nombre.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1 || products.categoria.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1);
        }
        
        if(req.query && req.query.talle){

            products = products.filter(products => products.talle.indexOf(req.query.talle) > -1);
        }

        if(req.query && req.query.color){

            products = products.filter(products => products.colores.indexOf(req.query.color) > -1);
        }

        if(req.query && req.query.range){

            products = products.filter(products => products.precio >= req.query.range);
        }

        if(req.params && req.params.categorias){
            
            products = products.filter(products => products.categoria.toLowerCase().indexOf(req.params.categorias.toLowerCase()) > -1);
        }

        
        res.render("products/productos", {
            title: "Zaphir",
            styles: ["products/productos-mobile", "products/productos-tablets", "products/productos-desktop"],
            products: products
        })
    },

    carrito: (req, res) => res.render("products/carrito", {
        title: "Carrito de compras",
        styles: ["products/carrito-mobile", "products/carrito-tablets", "products/carrito-desktop"]
    }),
    
    detalle: (req, res) => res.render("products/detalle", {
        title: "Detalle de producto",
        styles: ["products/detalle-mobile", "products/detalle-tablets", "products/detalle-desktop"]
    }),
}