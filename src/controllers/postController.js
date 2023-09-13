import { PostService } from "../services/signupService.js";
import bcrypt from 'bcrypt';



export class PostsController {
    postService = new PostService();

/* 게시글 생성 API */

createPost = async (req, res ,next) =>{
 try{
    const {nickname , userId} = req.user
    const {title , content} = req.body

    const createdPost = await this.postService.createPost({
        UserId: userId,
        nickname,
        title,
        content,
        createdAt,
        updatedAt,
  });

  return res.status(200).json({data : createdPost});

    }catch(err){
        next(err);
    }
    
}


/* 게시글 조회 API */

getPosts = async (req,res ,next) =>{
try{
    const posts = await this.postService.findAllPost();

    return res.status(200).json({data : posts});
}catch(err){
    next(err);
}

}


/* 게시글 상세 조회 API */

getOnePost = async (req,res ,next) =>{
    try{
        const { postId } = req.params;

        const post = await this.postService.findOnePost(postId);
    
        return res.status(200).json({data : post});

    }catch(err){
        next(err);
    }
    
    }



/* 게시글 수정 API */

updatePost = async (req,res ,next) =>{
    try{
        const { postId } = req.params;
        const { userId } = req.user;
        const { title, content } = req.body;



        const updatedPost = await this.postService.updatePost({
        userId,
        postId,
        title,
        content,
        });
    
        return res.status(200).json({ data: updatedPost });

    }catch(err){
        next(err);
    }
}



/* 게시글 삭제 API */

deletePost = async (req,res ,next) =>{
    try{
        const {userId} = req.user;
        const { postId } = req.params;

        const deletedPost = await this.postService.deletePost(postId,userId);
    
        return res.status(200).json({ data: deletedPost });

    }catch(err){
        next(err);
    }
}


}




// src/controllers/posts.controller.js

// import { PostsService } from '../services/posts.service.js';

// // Post의 컨트롤러(Controller)역할을 하는 클래스
// export class PostsController {
//   postsService = new PostsService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.



//   getPosts = async (req, res, next) => {
//     try {
//       // 서비스 계층에 구현된 findAllPosts 로직을 실행합니다.
//       const posts = await this.postsService.findAllPosts();

//       return res.status(200).json({ data: posts });
//     } catch (err) {
//       next(err);
//     }
//   };

//   getPostById = async (req, res, next) => {
//     try {
//       const { postId } = req.params;

//       // 서비스 계층에 구현된 findPostById 로직을 실행합니다.
//       const post = await this.postsService.findPostById(postId);

//       return res.status(200).json({ data: post });
//     } catch (err) {
//       next(err);
//     }
//   };




//   createPost = async (req, res, next) => {
//     try {
//       const { nickname, password, title, content } = req.body;

//       // 서비스 계층에 구현된 createPost 로직을 실행합니다.
//       const createdPost = await this.postsService.createPost(
//         nickname,
//         password,
//         title,
//         content,
//       );

//       return res.status(201).json({ data: createdPost });
//     } catch (err) {
//       next(err);
//     }
//   };




//   updatePost = async (req, res, next) => {
//     try {
//       const { postId } = req.params;
//       const { password, title, content } = req.body;

//       // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
//       const updatedPost = await this.postsService.updatePost(
//         postId,
//         password,
//         title,
//         content,
//       );

//       return res.status(200).json({ data: updatedPost });
//     } catch (err) {
//       next(err);
//     }
//   };





//   deletePost = async (req, res, next) => {
//     try {
//       const { postId } = req.params;
//       const { password } = req.body;

//       // 서비스 계층에 구현된 deletePost 로직을 실행합니다.
//       const deletedPost = await this.postsService.deletePost(postId, password);

//       return res.status(200).json({ data: deletedPost });
//     } catch (err) {
//       next(err);
//     }
//   };
// }




// PostController.js

// import PostService from './PostService';

// const postService = new PostService();

// class PostController {
//   async deletePost(req, res) {
//     try {
//       const { postId } = req.params;
//       const { userId } = req.user; // 사용자 아이디 가져오기

//       // 게시글 삭제
//       const result = await postService.deletePost(postId, userId);

//       return res.status(200).json(result);
//     } catch (err) {
//       if (err instanceof CustomError) {
//         return res.status(err.statusCode).json({ errorMessage: err.message });
//       } else {
//         console.error(err);
//         return res.status(500).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
//       }
//     }
//   }
// }

// export default PostController;
