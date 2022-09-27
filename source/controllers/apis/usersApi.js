const { user } = require('../../database/models')

const userApi = {
    all: async (req, res) => {
        try {
            let users = await user.findAll({
                include: {
                    all: true
                }
            })
            let data = {}
            data.count = users.length
            users = users.map(u => {
                return Object({
                    id: u.id,
                    nombre: u.nombre,
                    email: u.email,
                })
            })
            data.users = users
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    oneUser: async (req, res) => {
        try {
            let userDB = await user.findByPk(
                req.params.id, {
                include: {
                    all: true
                }
            })
            data = {}
            data.id = userDB.id
            data.nombre = userDB.nombre
            data.email = userDB.email
            data.telefono = userDB.telefono
            data.imagen = "http://localhost:3000/avatars/" + userDB.image.imagen
            if (userDB) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('No se encontró este usuario')
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = userApi 