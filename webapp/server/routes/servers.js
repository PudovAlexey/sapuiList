let Router = require('express')

let controllers = require('../controllers/servers')

let router = Router()

router.get('/api/server', controllers.getAll)


module.exports = router