const { product, image, color, size, productcolor, productsizes } = require("../database/models/index")
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
                }, {
                    where: {
                        id: productDB.images[index].id
                    }
                })
                unlinkSync(resolve(__dirname, "../../public/assets/productos/" + productDB.images[index].imagen))
            }
        }
        for (let index = 0; index < req.body.colores.length; index++) {
            if (req.body.colores[index] != "" && productDB.colors[index] != undefined) {
                await color.update({
                    color: req.body.colores[index]
                }, {
                    where: {
                        id: productDB.colors[index].id
                    }
                })
            } else if (req.body.colores[index] != "" && productDB.colors[index] == undefined) {
                let colorNew = await color.create({
                    color: req.body.colores[index]
                })
                await productDB.addColor(colorNew)
            } else if (req.body.colores[index] == "" && productDB.colors[index] != undefined) {
                await color.destroy({where: {id: productDB.colors[index].id}});
                await productcolor.destroy({where: {color_id: productDB.colors[index].id}});
            }
        }
        for (let index = 0; index < req.body.talle.length; index++) {
            if (req.body.talle[index] != "" && productDB.sizes[index] != undefined) {
                await size.update({
                    size: req.body.talle[index]
                }, {
                    where: {
                        id: productDB.sizes[index].id
                    }
                })
            } else if (req.body.talle[index] != "" && productDB.sizes[index] == undefined) {
                let talleNew = await size.create({
                    size: req.body.talle[index]
                })
                await productDB.addSize(talleNew)
            } else if (req.body.talle[index] == "" && productDB.sizes[index] != undefined) {
                await size.destroy({where: {id: productDB.sizes[index].id}})
                await productsizes.destroy({where: {size_id: productDB.sizes[index].id}})
            }
        }

        await productDB.update(req.body)
        return res.redirect("/productos/detalle/" + productDB.id)
    },

    productos: async (req, res) => {

        let products = await product.findAll({
            include: [
                { association: "images" },
            ]
        });

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
        let products = await product.findAll({
            include: [
            { association: "images" }
            ]})

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

    favoritos: async (req, res) => {
        let productDB = await product.findAll({
            include: [
            { association: "images" }
            ],
            limit: 8});
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
        let productDB = await product.findAll({
            include: [
            { association: "images" }
            ]});
        res.render("products/allProducts", {
            title: "Todos los productos",
            styles: ["products/fav-mobile", "products/fav-tablets", "products/fav-desktop"],
            products: productDB
        })
    }
}