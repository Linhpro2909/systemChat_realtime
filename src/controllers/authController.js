const connection = require('../config/database');
const bcrypt = require('bcrypt');

const getLogin = (req, res) => {
    return res.render('admin/login', { layout: false });
};

const postLogin = async (req, res) => {
    const { name, password } = req.body;

    const [rows] = await connection.query(
        'SELECT * FROM users WHERE name = ?',
        [name]
    );

    if (rows.length === 0) {
        return res.send('User không tồn tại');
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.send('Sai mật khẩu');
    }

    // Lưu session
    req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role
    };

    return res.redirect('/profile');
};

module.exports = {
    getLogin,
    postLogin
};