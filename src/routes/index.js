import express from 'express';
import signupRouter from './signup.js';
import loginRouter from './login.js';
import PostsRouter from './post.js';
import likeRouter from './like.js';
import commentRouter from './comment.js';


const router = express.Router();

router.use('/signup/', signupRouter);
router.use('/login/',  loginRouter);
router.use('/posts/',  PostsRouter);
router.use('/posts/',  likeRouter);
router.use('/posts/',  commentRouter);

export default router;
