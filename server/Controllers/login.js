import bcrypt from 'bcrypt';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';

export const login = async (req, res) => {
    const {email, password} = req.body;
    const JWT_SECRET = 'Its a secret';
    try {
        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) throw Error('User does not exist');
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid credentials');
    
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        if (!token) throw Error('Couldnt sign the token');
        
        res.cookie('token', token);
        res.header('Content-Type', 'application/json');
        
        res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });


        // res.writeHead(200, {
        //   "Set-Cookie": `token=${token};HttpOnly`,
        //   "Access-Control-Allow-Credential": "true"
        // }).send();

      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
    };
