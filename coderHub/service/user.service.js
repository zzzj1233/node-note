const pool = require('../app/dbPool')

class UserService {

    async selectUserByPhone(phone) {
        const [rows] = await pool.query("SELECT * FROM xf_user_customer where mobilephone = ? ", [phone])
        return rows[0]
    }

    async selectUserById(id) {
        const [rows] = await pool.query("SELECT * FROM xf_user_customer where id = ? ", [id])
        return rows[0]
    }

    async insertUser(phone, password) {
        const [rows] = await pool.query("INSERT INTO xf_user_customer(mobilephone, password) values (?, ?)", [phone, password])
        return rows?.affectedRows
    }

}

module.exports = new UserService()
