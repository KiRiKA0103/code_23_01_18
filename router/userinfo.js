const express = require('express')

const router = express.Router()

const userInfoHandler = require('../router_handler/userinfo')

const expressJoi = require('@escook/express-joi')

const { update_userinfo_schema, update_password_schema,update_avatar_schame} = require('../schema/user')

router.get('/userinfo', userInfoHandler.getUserInfo)

router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)

router.post('/update/pwd',expressJoi(update_password_schema), userInfoHandler.updatePassword)

router.post('/update/avatar',expressJoi(update_avatar_schame) ,userInfoHandler.updateAvatar)



module.exports = router