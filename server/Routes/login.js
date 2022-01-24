import express from 'express';
import {login} from '../Controllers/login.js';
import cookie from 'cookie-parser';

const router = express.Router();
router.use(cookie());
router.post('/login', login);

export default router;