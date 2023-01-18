// 数据库配置文件




const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1q2w3e',
    database:'my_db_01'
})


module.exports = db