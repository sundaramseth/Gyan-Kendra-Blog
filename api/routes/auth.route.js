import express from 'express'
import { signup, signin, googleAuth } from '../controllers/auth.controler.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', googleAuth)

export default router;