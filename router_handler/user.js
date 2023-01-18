
const db = require('../db/index')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const config = require('../config')


exports.reguser = (req, res) => {

    // 获取验证通过后的数据
    const userInfo = req.body

    // 用户名和密码合法性检测(正则表达式)
    // if (!userInfo.email || !userInfo.password) {
    //     return res.send({
    //         status: 1,
    //         message: '用户名或密码不合法'
    //     })
    // }

    const sql = 'select * from ev_users where email=?'

    db.query(sql, [userInfo.email], (err, results) => {
        if (err) {
            // return res.send({
            //     sataus: 1,
            //     message: err.message
            // })

            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '邮箱已被注册'
            // })

            return res.cc('邮箱已被注册')
        }

        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        const sql2 = 'insert into ev_users set ?'
        db.query(sql2, { email: userInfo.email, password: userInfo.password }, (err, results) => {
            if (err) {
                // return res.send({
                //     sataus: 1,
                //     message: err.message
                // })

                return res.cc(err)
            }
            if (results.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     message: '注册失败'
                // })

                return res.cc('注册失败')
            }
            // res.send({
            //     status: 0,
            //     message: '注册成功'
            // })

            res.cc('注册成功', 0)
        })

    })

}

exports.login = (req, res) => {
    const userInfo = req.body

    const sql = 'select * from ev_users where email=?'
    db.query(sql, userInfo.email, (err, results) => {
        if (err) return res.cc(err)

        // 用户不存在 登录失败
        if (results.length !== 1) return res.cc('登录失败 用户不存在')

        // 验证密码
        const compareRes = bcrypt.compareSync(userInfo.password, results[0].password)

        if (!compareRes) {
            return res.cc('登录失败 密码错误')
        }

        // 生成Token字符串 
        const user = { ...results[0], password: '', nickname: '', avatar: '' }

        const tokenStr = jwt.sign(user, config.jwtSecretkey, { expiresIn: '30m' })
        console.log(tokenStr);
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })

    })

}