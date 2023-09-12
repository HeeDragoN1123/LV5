import { PostsService } from "../services/signupService.js";
export class PostsController {
    postsService = new PostsService();

/* 게시글 생성 API */

createPost = async (req, res ,next) =>{
 try{
    const {nickname , userId} = req.user
    const {title , content } = req.body

    const createdPost = await this.createPost({
        UserId: userId,
        nickname,
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
  });

  return res.status(200).json({data : createdPost});

    }catch(err){
        next(err);
    }
    
}


/* 게시글 조회 API */

getPosts = async (req,res ,next) =>{
try{
    const posts = await this.postsService.findAllPost();

    return res.status(200).json({data : posts});
}catch(err){
    next(err);
}

}

/* 게시글 상세 조회 API */

getOnePost = async (req,res ,next) =>{
    try{
        const { postId } = req.params;

        const post = await this.postsService.findOnePost();
    
        return res.status(200).json({data : post});

    }catch(err){
        next(err);
    }
    
    }


/* 게시글 수정 API */


putPost = async (req,res ,next) =>{

}


/* 게시글 삭제 API */

deletePost = async (req,res ,next) =>{

}


}