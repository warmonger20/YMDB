import bcrypt from 'bcrypt';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
export const signup = async (req, res) => {
    const {email, password, username} = req.body;
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ email: email, password: hash, username: username});
    
    try {
        const token = jwt.sign({id: user.id}, "Its a secret");
        if(!token) 
            throw Error('Couldnt sign the token');

        
        res.cookie('token', token);
        res.header('Content-Type', 'application/json');
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        });
        console.log(user.id, user.email, user.username);
        await user.save();
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
    
}   