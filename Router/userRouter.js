import express from 'express';
import { signup, login, main } from '../Controller/userController.js';
import { jwtAutherMiddleware } from '../Jwt/token.js';

const router = express.Router();

router.post('/signup',signup);
router.post('./login',login);
router.get('./main', jwtAutherMiddleware, main);

export default router;