import express from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();
const loginController = new LoginController(); // 포스트 컨트롤러를 인스턴스 화 시킴

/* 로그인 API */
router.post('/', loginController.loginUser);




export default router;