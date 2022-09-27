const { Router } = require('express')
const router = Router()

const { all, oneUser } = require('../../controllers/apis/usersApi')

router.get('/', all)
router.get('/:id', oneUser)

module.exports = router 