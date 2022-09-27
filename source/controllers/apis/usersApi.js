const {user, image} = require('../../database/models')
const {hashSync} = require('bcryptjs')

const userApi = {
    all: async(req, res) => {
        try {
            let users = await user.findAll({
                include : {
                    all : true
                }
            })
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    oneUser : async (req, res) => {
        try {
            let userDB = await user.findByPk(
                req.params.id, {
                    include : {
                        all : true
                    }
                }
            )
            if(userDB){
                return res.status(200).json(userDB)
            }else {
                return res.status(404).json('No se encontró este usuario')
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    process : async (req,res) => {

        try {
            req.body.password = hashSync(req.body.password,10)
            req.body.isAdmin = req.body.username.includes('@zaphir.com') ? true : false

            let newUser = await user.create(req.body)
            if(newUser){
                return res.status(200).json(newUser)
            }else {
                return res.status(404).json('No se creó el usuario')
            }

    } catch (error) {
        return res.status(500).json(error)   
    }
    },
    userDelete : async (req, res) => {
        try { 
            let userDB = await user.findByPk(req.params.id)

            if(!userDB) {
                return res.status(404).json('No se encontró el usuario')
            }
        
            let deleted = await userDB.destroy()

            if(deleted){
            return res.status(200).json(true)
            }else {
            return res.status(500).json(false)
            }
        }catch (error){
            return res.status(500).json(error)
    }
    }   
}

module.exports = userApi 