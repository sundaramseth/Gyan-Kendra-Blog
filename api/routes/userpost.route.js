import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts, deletepost, updatepost, likePost  } from '../controllers/userpost.controler.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);
router.put('/likepost/:postId', verifyToken, likePost);

export default router;