const { product } = require("../../database/models");

const productsApi = {
    count: async (req, res) => {
        try {
            let products = await product.findAll({
                include: {
                    all: true
                }
            });
            let data = {};
            let categorias = products.map(p => {
                return p.categoria
            })
            const resultado = {};
            categorias.forEach(el => (resultado[el] = resultado[el] + 1 || 1));
            data.count = products.length
            data.countByCategory = resultado

            products = products.map(p => {
                let colores = p.colors.map(c => c.color);
                let talles = p.sizes.map(t => t.size);
                let imagenes = p.images.map(i => "http://localhost:3000/assets/productos/" + i.imagen);
                return Object({
                    id: p.id,
                    nombre: p.nombre,
                    descripcion: p.descripcion,
                    info: {
                        categoria: p.categoria,
                        colores,
                        talles,
                        imagenes,
                    }
                })
            })
            data.products = products
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    one: async (req, res) => {
        try {
            let productDB = await product.findByPk(req.params.id, {include: {all:true}});
            let data = {}
            let colores = productDB.colors.map(c => c.color);
            let talles = productDB.sizes.map(t => t.size);
            let imagenes = productDB.images.map(i => "http://localhost:3000/assets/productos/" + i.imagen);
            data.id = productDB.id
            data.nombre = productDB.nombre
            data.descripcion = productDB.descripcion
            data.categoria = productDB.categoria
            data.stock = productDB.stock
            data.precio = productDB.precio
            data.descuento = productDB.descuento
            data.colores = colores
            data.talles = talles
            data.imagenes = imagenes
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = productsApi