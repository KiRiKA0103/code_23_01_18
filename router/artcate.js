const express = require('express')

const router = express.Router()

const artcateHandler = require('../router_handler/artcate')

const expressJoi = require('@escook/express-joi')

const { add_cate_schema, isid_cate_schema, update_cate_schema } = require('../schema/artcate')

router.get('/cates', artcateHandler.getArticleCates)

router.post('/addcate', expressJoi(add_cate_schema), artcateHandler.addArticleCates)

router.get('/delcate/:id', expressJoi(isid_cate_schema), artcateHandler.delCateById)

router.get('/getcate/:id', expressJoi(isid_cate_schema), artcateHandler.getCateById)

router.post('/updatecate', expressJoi(update_cate_schema), artcateHandler.updateCateById)

module.exports = router