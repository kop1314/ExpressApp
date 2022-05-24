const {
    User
} = require('../../models');

async function createUsername(req, res) {
    try {
        const userId = req.user.id;
        const {username} = req.body;
        await User.update(
            {
                username: username,
            },
            {
                where: {
                     id: userId
                }
            }
        )
        return res.status(200).json({
            message: "Create username successfully!"
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    createUsername,
}