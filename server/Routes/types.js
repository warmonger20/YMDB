import express from 'express';
import { allData, allMovies, search } from '../Controllers/types.js';

const router = express.Router();

router.get('/', allData);
router.get('/movies',(req, res) => allMovies(req, res, 'movie'));
router.get('/tvshows', (req, res) => allMovies(req, res, 'tv'));
router.get('/anime', (req, res) => allMovies(req, res, 'anime'));
router.post('/search', search);
export default router;