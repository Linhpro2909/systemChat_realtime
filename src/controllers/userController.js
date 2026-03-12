const connection = require("../config/database");

// 1. Hàm render trang profile ban đầu
const getListUser = async (req, res) => {
    try {
        const currentUserId = req.session.user.id;
        let [users] = await connection.query(
            'SELECT id, name FROM users WHERE status = 1 AND id <> ?',
            [currentUserId]
        );

        let listMessages = [];
        let chattingWith = null;

        if (users.length > 0) {
            chattingWith = users[0];
            [listMessages] = await connection.query(
                `SELECT * FROM chatbot1 
                 WHERE (id_sent = ? AND id_give = ?) OR (id_sent = ? AND id_give = ?) 
                 ORDER BY id ASC`,
                [currentUserId, chattingWith.id, chattingWith.id, currentUserId]
            );
        }

        return res.render('admin/profile', {
            listUser: users,
            listMessages: listMessages,
            currentUserId: currentUserId,
            chattingWith: chattingWith
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi hệ thống");
    }
}

// 2. API Lấy tin nhắn khi Click (Dùng để fix lỗi 404 của bạn)
const getMessages = async (req, res) => {
    try {
        const currentUserId = req.session.user.id;
        const chatWithId = req.params.id; // Lấy ID từ URL /get-messages/2

        const [rows] = await connection.query(
            `SELECT * FROM chatbot1 
             WHERE (id_sent = ? AND id_give = ?) OR (id_sent = ? AND id_give = ?) 
             ORDER BY id ASC`,
            [currentUserId, chatWithId, chatWithId, currentUserId]
        );
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// 3. Hàm gửi tin nhắn
const sendMessage = async (req, res) => {
    const { receiverId, message } = req.body;
    const senderId = req.session.user.id;
    try {
        await connection.query(
            'INSERT INTO chatbot1 (id_sent, id_give, message_sent, message_give, created_at) VALUES (?, ?, ?, ?, NOW())',
            [senderId, receiverId, message, message]
        );
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getListUser, getMessages, sendMessage };