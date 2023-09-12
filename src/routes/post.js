import express from 'express';
import { PostsController } from '../controllers/postController.js';

const router = express.Router();
const postsController = new PostsController(); // 포스트 컨트롤러를 인스턴스 화 시킴

/* 게시글 생성 API */
router.post('/posts', postsController.createPost);
/* 게시글 조회 API */
router.get('/posts' , postsController.getPosts);
/* 게시글 상세 조회 API */
router.get('/posts/:postId', postsController.getOnePost);
/* 게시글 수정 API */
router.put('/posts/:postId', postsController.putPost);
/* 게시글 삭제 API */
router.delete('/posts/:postId', postsController.deletePost);



export default router;

