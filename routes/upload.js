const router = require('koa-router')()
const Upload = require('../controller/upload/index')

router.prefix('/upload')

router.post('/i18nToJson', Upload.i18nToJson)

module.exports = router
