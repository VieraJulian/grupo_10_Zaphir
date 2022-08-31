const { product, image, color, size } = require("../database/models/index")
const { validationResult } = require('express-validator');
const { unlinkSync } = require("fs");
const { resolve } = require("path");

module.exports = {
    create: async (req, res) => {
        res.render("products/create", {
            title: "Nuevo producto",
            styles: ["products/create-mobile"],
        })
    },

    save: async (req, res) => {
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
        function porciento(precio, descuento) {
            let resultadoDivision = precio / descuento
            return (100 / resultadoDivision).toFixed(1)
        }

        req.body.precioFinal = parseInt(req.body.precio - req.body.descuento);
        req.body.porciento = parseInt(porciento(req.body.precio, req.body.descuento));

        let newProduct = await product.create(req.body)

        if (req.files && req.files.length > 0) {
            let images = await Promise.all(req.files.map(file => {
                return image.create({
                    imagen: file.filename
                })
            }));

            let addProductImages = await Promise.all(images.map(image => {
                return newProduct.addImage(image)
            }))
        }

        let colors = await Promise.all(req.body.colores.map(c => {
            if (c != "") {
                return color.create({
                    color: c
                })
            }
        }));

        let addProductColors = await Promise.all(colors.map(color => {
            return newProduct.addColor(color)
        }));

        let talles = await Promise.all(req.body.talle.map(s => {
            if (s != "") {
                return size.create({
                    size: s
                })
            }
        }));

        let addProductSizes = await Promise.all(talles.map(talle => {
            return newProduct.addSize(talle)
        }))

        res.redirect("/productos")
    },

    edit: async (req, res) => {
        let productDB = await product.findByPk(req.params.id, {
            include: [
                { association: "images" },
                { association: "colors" },
                { association: "sizes" },
            ]
        });

        if (!productDB) {
            return res.redirect("/productos")
        }
        return res.render("products/edit", {
            title: "Editar producto",
            styles: ["products/edit-mobile"],
            product: productDB
        })
    },

    modify: async (req, res) => {
        let productDB = await product.findByPk(req.params.id, {
            include: [
                { association: "images" },
                { association: "colors" },
                { association: "sizes" },
            ]
        });
        function porciento(precio, descuento) {
            let resultadoDivision = precio / descuento
            return (100 / resultadoDivision).toFixed(1)
        }

        req.body.precioFinal = parseInt(req.body.precio - req.body.descuento);
        req.body.porciento = parseInt(porciento(req.body.precio, req.body.descuento));

        if (req.files && req.files.length > 0) {
            for (let index = 0; index < productDB.images.length; index++) {
                await image.update({
                    imagen: req.files[index].filename
                },{
                    where: {
                        id: productDB.images[index].id
                    }
                })
                unlinkSync(resolve(__dirname, "../../public/assets/productos/" + productDB.images[index].imagen))
            }
        }

        await productDB.update(req.body)
        /* let imagenes = req.files.map(file => file.filename)
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
        }) */
        return res.send(productDB)
        return res.redirect("/productos/detalle/" + productDB.id)
    },

    productos: async (req, res) => {

        let products = await product.findAll()

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

    detalle: async (req, res) => {

        let productDB = await product.findByPk(req.params.id, {
            include: [
                { association: "images" },
                { association: "colors" },
                { association: "sizes" },
            ]
        });
        res.render("products/detalle", {
            title: "Detalle de producto",
            styles: ["products/detalle-mobile", "products/detalle-tablets", "products/detalle-desktop"],
            product: productDB
        })
    },
    destroid: async (req, res) => {
        let productDB = await product.findByPk(req.params.id);
        if (!productDB) {
            return res.redirect('/productos/')
        }
        /*  let products = index()
         let productsDeleted = products.filter(p => p.id !== product.id)
         write(productsDeleted) */
        await product.destroy({ where: { id: productDB.id } })
        return res.redirect('/productos/')
    },

    ofertas: async (req, res) => {
        let products = await product.findAll();

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
            products: productDB
        })

    },

    favoritos: async (req, res) => {
        let productDB = await product.findAll();
        res.render("products/favorites", {
            title: "Favoritos",
            styles: ["products/fav-mobile", "products/fav-tablets", "products/fav-desktop"],
            products: productDB
        })
    },

    carrito: async (req, res) => res.render("products/carrito", {
        title: "Carrito de compras",
        styles: ["products/carrito-mobile", "products/carrito-tablets", "products/carrito-desktop"]
    }),

    allProducts: async (req, res) => {
        let productDB = await product.findAll();
        res.render("products/allProducts", {
            title: "Todos los productos",
            styles: ["products/fav-mobile", "products/fav-tablets", "products/fav-desktop"],
            products: productDB
        })
    }
}