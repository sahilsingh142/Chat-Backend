import express from 'express';
import { sendMessage, getMessage, getUser } from '../Controller/messageController.js';
import { jwtAutherMiddleware } from '../Jwt/token.js';

const router = express.Router();

router.post('/sendMessage/:id',jwtAutherMiddleware, sendMessage);
router.get('/getMessage/:id',jwtAutherMiddleware, getMessage);
router.get('/getUser',jwtAutherMiddleware, getUser);

export default router;