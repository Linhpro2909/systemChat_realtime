
const connection = require("../config/database");
const getHome = async (req, res) => {
    return res.render('admin/home')
}
// const getHomepage = async (req, res) => {
//     return res.render('mater')
// }
const getLogin = async (req, res) => {
    return res.render('admin/login', { layout: false });
}
const getProfile = async (req, res) => {
    let [result, fields] = await connection.query('SELECT * FROM task')
    return res.render('admin/profile', { dataTask: result })
}
module.exports = {
    getLogin,
    getProfile,
    getHome
}