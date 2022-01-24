import express from 'express';
import { createPost } from '../Controllers/post.js';
import cookie from 'cookie-parser';

const router = express.Router();

router.post('', createPost);

export default router;