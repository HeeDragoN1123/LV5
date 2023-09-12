import express from 'express';
import { PostsController } from '../controllers/postController.js';

const router = express.Router();
const postsController = new PostsController(); // 포스트 컨트롤러를 인스턴스 화 시킴

/* 게시글 생성 API */


/* 게시글 조회 API */

/* 게시글 상세 조회 API */

/* 게시글 수정 API */

/* 게시글 삭제 API */

export default router;

