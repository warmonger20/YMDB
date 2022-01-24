import express from 'express';
import {signup} from '../Controllers/signup.js';
const router = express.Router();

router.post('/signup',signup)
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        msg: 'Logout Successful'
    });
})
export default router; 
