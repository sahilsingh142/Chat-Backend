import express from 'express';
import { sendMessage, getMessage } from '../Controller/messageController.js';
import { jwtAutherMiddleware } from '../Jwt/token.js';

const router = express.Router();

router.post('/send/:id',jwtAutherMiddleware, sendMessage);
router.get('./get/:id',jwtAutherMiddleware, getMessage);

export default router;