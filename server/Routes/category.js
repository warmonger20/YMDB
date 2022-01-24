import express from 'express';
import {showCollection, showMovies} from '../Controllers/category.js';

const router = express.Router();

router.get('', showCollection);
router.get('/:category', showMovies);
export default router;