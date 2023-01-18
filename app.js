const express = require('express')
const app = express()

const cors = require('cors')

const Joi = require('joi')

const expressJWT = require('express-jwt')
const config = require('./config')


// 解决跨域中间件
app.use(cors())
// 解析表单数据中间件
app.use(express.urlencoded({ extended: false }))

// 托管静态资源
app.use('/uploads',express.static('./uploads'))

// 
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 在路由之前配置解析token中间件
// 请求除/api开头的地址时 需携带token字符串
app.use(expressJWT({secret:config.jwtSecretkey}).unless({path:[/^\/api/]}))




// 导入路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

const userInfoRouter = require('./router/userinfo')
app.use('/my',userInfoRouter)

const artCateRouter = require('./router/artcate')
app.use('/my/article',artCateRouter)

const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)


// 错误中间件
app.use((err, req, res, next) => {
    // 表单验证失败错误
    if (err instanceof Joi.ValidationError) return res.cc(err)
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    res.cc(err)
})




app.listen(80, () => {
    console.log('Example app listening on port 80')
})