const express = require('express');
const routerHandler = require('../router_handler/artcate');
const router = express.Router();
const expressjoi = require('@escook/express-joi');
const { addArticleCateSchema, deleteArticleCateSchema, updateArticleCatesSchema } = require('../schema/user');

router.get('/cates', routerHandler.getArticleCates);
router.post('/addcates', expressjoi(addArticleCateSchema), routerHandler.addArticleCates);
// :id是一个动态参数， /3表示删除id为3的数据行
router.get('/deletecate/:id', expressjoi(deleteArticleCateSchema), routerHandler.deleteArticleCates);
router.get('/cates/:id', expressjoi(deleteArticleCateSchema), routerHandler.getArticleCatesById);
router.post('/updatecate', expressjoi(updateArticleCatesSchema), routerHandler.updateArticleCates);
module.exports = router;
