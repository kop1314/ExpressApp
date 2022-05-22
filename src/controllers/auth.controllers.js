const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../../models');

async function signUp(req, res) {
    try{
        const { name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                message: 'Missing input!'
            });
        }
        
        lowerCaseEmail = email.toLowerCase();

        const existUser = await User.findOne({
            where: {email: lowerCaseEmail}
        });

        if (existUser) {
            return res.status(409).send({
                message: 'User Exists!'
            });
        }

        
        encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            email: lowerCaseEmail,
            password: encryptedPassword,
        });
        
        
        return res.status(201).json({
            message: 'User was registered successfully!'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err.message});
    }
}

async function signIn(req, res) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).send({
                message: 'Missing Input'
            });
        }

        lowerCaseEmail = email.toLowerCase();

        const user = await User.findOne({
            where: {email: lowerCaseEmail}
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {id: user.id},
                process.env.TOKEN_SECRET_KEY,
                {expiresIn: '2h'}
            )
    
            user.token = token;
            return res.status(200).send({
                name: user.name,
                email: user.email,
                token: token,
            })
        }

        return res.status(401).send({
            message: 'Invalid Credentials!',
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
}



module.exports = {
    signUp,
    signIn,
}