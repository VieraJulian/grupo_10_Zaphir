const { index, create, write, one } = require("../models/products.models")
const { validationResult } = require('express-validator');
const { unlinkSync } = require("fs");
const { resolve } = require("path");

module.exports = {
    create: (req, res) => {
        res.render("products/create", {
            title: "Nuevo producto",
            styles: ["products/create-mobile"],
        })
    },

    save: (req, res) => {
        let validaciones = validationResult(req)
        let { errors } = validaciones
        if (errors && errors.length > 0) {
            return res.render("products/create", {
                title: "Nuevo producto",
                styles: ["products/create-mobile"],
                oldData: req.body,
                errors: validaciones.mapped()
            });
        }
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
        function porciento(precio, descuento) {
            let resultadoDivision = precio / descuento
            return (100 / resultadoDivision).toFixed(1)
        }
        let productsModifieds = products.map(p => {
            if (p.id === product.id) {
                p.nombre = req.body.nombre;
                p.descripcion = req.body.descripcion;
                p.categoria = req.body.categoria;
                p.colores = req.body.colores;
                p.talle = req.body.talle;
                p.stock = parseInt(req.body.stock);
                p.precio = parseInt(req.body.precio);
                if (req.files && req.files.length > 0) {
                    for (let index = 0; index < req.files.length; index++) {
                        unlinkSync(resolve(__dirname, "../../public/assets/productos/" + p.imagen[index]))
                    }
                    p.imagen = imagenes
                } else {
                    p.imagen
                }
                p.descuento = parseInt(req.body.descuento);
                p.precioFinal = parseInt(req.body.precio - req.body.descuento),
                p.porciento = parseInt(porciento(req.body.precio, req.body.descuento))
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

        if (req.query && req.query.talle) {

            products = products.filter(products => products.talle.indexOf(req.query.talle) > -1);
        }


        if (req.query && req.query.color) {

            products = products.filter(products => products.colores.indexOf(req.query.color) > -1);
        }

        if (req.query && req.query.range) {

            products = products.filter(products => products.precioFinal >= req.query.range);
        }

        if (req.params && req.params.categorias) {

            products = products.filter(products => products.categoria.toLowerCase().indexOf(req.params.categorias.toLowerCase()) > -1);
        }


        res.render("products/productos", {
            title: "Zaphir",
            styles: ["products/productos-mobile", "products/productos-tablets", "products/productos-desktop"],
            products: products
        })
    },

    detalle: (req, res) => {

        let product = one(parseInt(req.params.id))

        res.render("products/detalle", {
            title: "Detalle de producto",
            styles: ["products/detalle-mobile", "products/detalle-tablets", "products/detalle-desktop"],
            product: product
        })
    },
    destroid: (req, res) => {
        let product = one(parseInt(req.params.id))
        if (!product) {
            return res.redirect('/productos/')
        }
        let products = index()
        let productsDeleted = products.filter(p => p.id !== product.id)
        write(productsDeleted)
        return res.redirect('/productos/')
    },

    ofertas: (req, res) => {
        let products = index();

        products = products.filter(products => products.descuento > 0)

        if (req.query && req.query.name) {

            products = products.filter(products => products.nombre.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1 || products.categoria.toLowerCase().indexOf(req.query.name.toLowerCase()) > -1);
        }

        if (req.query && req.query.talle) {

            products = products.filter(products => products.talle.indexOf(req.query.talle) > -1);
        }

        if (req.query && req.query.color) {

            products = products.filter(products => products.colores.indexOf(req.query.color) > -1);
        }

        if (req.query && req.query.range) {

            products = products.filter(products => products.precioFinal >= req.query.range);
        }

        if (req.params && req.params.categorias) {

            products = products.filter(products => products.categoria.toLowerCase().indexOf(req.params.categorias.toLowerCase()) > -1);
        }

        return res.render("products/ofertas", {
            title: "Ofertas",
            styles: ["products/productos-mobile", "products/productos-tablets", "products/productos-desktop"],
            products: products
        })

    },

    favoritos: (req, res) => {
        let products = index();
        res.render("products/favorites", {
            title: "Favoritos",
            styles: ["products/fav-mobile", "products/fav-tablets", "products/fav-desktop"],
            products: products
        })
    },

    carrito: (req, res) => res.render("products/carrito", {
        title: "Carrito de compras",
        styles: ["products/carrito-mobile", "products/carrito-tablets", "products/carrito-desktop"]
    }),

    allProducts: (req, res) => {
        let products = index();
        res.render("products/allProducts", {
            title: "Todos los productos",
            styles: ["products/fav-mobile", "products/fav-tablets", "products/fav-desktop"],
            products: products
        })
    }
}