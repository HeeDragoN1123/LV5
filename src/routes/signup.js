import express from 'express';
import { SignupController } from '../controllers/signupController';

const router = express.Router();
const signupController = new SignupController(); // 포스트 컨트롤러를 인스턴스 화 시킴

/* 회원가입 API */
router.post('/', signupController.createUser);




export default router;
