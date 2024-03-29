const { product, image, color, size, productcolor, productsize, imageproduct } = require("../database/models/index")
const { validationResult } = require('express-validator');
const { unlinkSync } = require("fs");
const { resolve } = require("path");
const { Op } = require("sequelize");

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
        };
        req.body.color = req.body.color.toLowerCase().split(",")
        req.body.talle = req.body.talle.toUpperCase().split(",")
        req.body.descuento = req.body.descuento != "" ? req.body.descuento : null

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

        let colors = await Promise.all(req.body.color.map(c => {
            return color.create({
                color: c
            })
        }));

        let addProductColors = await Promise.all(colors.map(color => {
            return newProduct.addColor(color)
        }));

        let talles = await Promise.all(req.body.talle.map(s => {
            return size.create({
                size: s
            })
        }));

        let addProductSizes = await Promise.all(talles.map(talle => {
            return newProduct.addSize(talle)
        }))
        res.redirect("/productos")
    },
    edit: async (req, res) => {
        let productDB = await product.findByPk(req.params.id, {
            include: {
                all: true
            }
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
            include: {
                all: true
            }
        });
        let validaciones = validationResult(req)
        let { errors } = validaciones
        if (errors && errors.length > 0) {
            return res.render("products/edit", {
                title: "Editar producto",
                styles: ["products/edit-mobile"],
                oldData: req.body,
                errors: validaciones.mapped(),
                product: productDB
            });
        };

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
        req.body.color = req.body.color.toLowerCase().split(",").filter(c => c != "")
        req.body.talle = req.body.talle.toUpperCase().split(",").filter(t => t != "")

        for (let index = 0; index < 12; index++) {
            if (productDB.colors[index] != undefined && req.body.color[index] != undefined) {
                await color.update({
                    color: req.body.color[index]
                }, {
                    where: {
                        id: productDB.colors[index].id
                    }
                })
            } else if (productDB.colors[index] == undefined && req.body.color[index] != undefined) {
                let colorNew = await color.create({
                    color: req.body.color[index]
                })
                await productDB.addColor(colorNew)
            } else if (productDB.colors[index] != undefined && req.body.color[index] == undefined) {
                await productcolor.destroy({ where: { color_id: productDB.colors[index].id } });
                await color.destroy({ where: { id: productDB.colors[index].id } });
            }
        }

        for (let index = 0; index < 6; index++) {
            if (productDB.sizes[index] != undefined && req.body.talle[index] != undefined) {
                await size.update({
                    size: req.body.talle[index]
                }, {
                    where: {
                        id: productDB.sizes[index].id
                    }
                })
            } else if (productDB.sizes[index] == undefined && req.body.talle[index] != undefined) {
                let talleNew = await size.create({
                    size: req.body.talle[index]
                })
                await productDB.addSize(talleNew)
            } else if (productDB.sizes[index] != undefined && req.body.talle[index] == undefined) {
                await productsize.destroy({ where: { size_id: productDB.sizes[index].id } })
                await size.destroy({ where: { id: productDB.sizes[index].id } })
            }
        }

        await productDB.update(req.body)
        console.log(productDB.id)
        return res.redirect("/productos/detalle/" + productDB.id)
    },

    productos: async (req, res) => {

        let products = await product.findAll({
            include: [
                { association: "images" }
            ]
        })

        if (req.query && req.query.name) {
            products = await product.findAll({
                include: [
                    { association: "images" }
                ],
                where: {
                    nombre: {
                        [Op.like]: "%" + req.query.name + "%"
                    }
                },
                limit: 9
            });
        }
        /* if (req.query && req.query.talle) {

            products = products.filter(products => products.talle.indexOf(req.query.talle) > -1);
        }
        if (req.query && req.query.color) {

            products = products.filter(products => products.colores.indexOf(req.query.color) > -1);
        } */
        if (req.query && req.query.range) {

            products = products.filter(products => products.precioFinal >= req.query.range);
        }

        if (req.params && req.params.categorias) {
            products = await product.findAll({
                include: [
                    { association: "images" }
                ],
                where: {
                    categoria: {
                        [Op.like]: req.params.categorias
                    }
                },
            });
        }
        res.render("products/productos", {
            title: "Zaphir",
            styles: ["products/productos-mobile", "products/productos-tablets", "products/productos-desktop"],
            products: products
        })
    },
    detalle: async (req, res) => {

        let productDB = await product.findByPk(req.params.id, {
            include: {
                all: true
            }
        });
        res.render("products/detalle", {
            title: "Detalle de producto",
            styles: ["products/detalle-mobile", "products/detalle-tablets", "products/detalle-desktop"],
            product: productDB,

        })
    },
    ofertas: async (req, res) => {
        let products = await product.findAll({
            include: [
                { association: "images" }
            ],
            where: {
                descuento: {
                    [Op.gt]: 0
                }
            }
        })
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
            limit: 8
        });
        res.render("products/favorites", {
            title: "Favoritos",
            styles: ["products/fav-mobile", "products/fav-tablets", "products/fav-desktop"],
            products: productDB
        })
    },
    carrito: async (req, res) =>
        res.render("products/carrito", {
            title: "Carrito de compras",
            styles: ["products/carrito-mobile", "products/carrito-tablets", "products/carrito-desktop"]
        }),

    allProducts: async (req, res) => {
        let productDB = await product.findAll({
            include: [
                { association: "images" }
            ]
        });
        res.render("products/allProducts", {
            title: "Todos los productos",
            styles: ["products/fav-mobile", "products/fav-tablets", "products/fav-desktop"],
            products: productDB
        })
    },
    destroid: async (req, res) => {
        let productDB = await product.findByPk(req.params.id, {
            include: {
                all: true
            }
        });
        if (!productDB) {
            return res.redirect('/productos/')
        }
        productDB.images.forEach(async (i, index) => {
            Promise.all([await imageproduct.destroy({ where: { product_id: productDB.id } }),
            await image.destroy({ where: { id: productDB.images[index].id } }),
            unlinkSync(resolve(__dirname, "../../public/assets/productos/" + productDB.images[index].imagen))])
        })
        productDB.colors.forEach(async (c, index) => {
            Promise.all([await productcolor.destroy({ where: { product_id: productDB.id } }),
            await color.destroy({ where: { id: productDB.colors[index].id } })])
        })
        productDB.sizes.forEach(async (s, index) => {
            Promise.all([await productsize.destroy({ where: { product_id: productDB.id } }),
            await size.destroy({ where: { id: productDB.sizes[index].id } })])
        });
        await productDB.destroy()
        return res.redirect('/productos/')
    },
}