import { PostsRepository } from "../repositories/signupRepository.js"
import Joi from 'joi';

// 유효성 검사 Joi
// const re_title = /^[a-zA-Z0-9가-힣\s.!?]{2,30}$/; //영문 대소문자, 숫자, 한글, 공백, 마침표, 느낌표, 물음표를 포함
// const re_content =/^[a-zA-Z0-9가-힣\s.!?]{1,5000}$/; //영문 대소문자, 숫자, 한글, 공백, 마침표, 느낌표, 물음표를 포함

const joiPost = Joi.object({
  title : Joi.string().required(),
  content : Joi.string().required(),
})


export class PostsService {
PostsRepository = new PostsRepository();


/* 게시글 생성 */
createPost = async(title , content) =>{
   try{   
    // 입력 데이터 유효성 검사
      const { err } = joiPost.validate({ title, content });

      if (err) {
        // 디테일한 정보를 에러 객체에 추가
        err.details.forEach((detail) => {
          err[detail.context.key] = detail.message;
        });

        throw err;
      };

    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdPost = await this.postRepository.createPost(
        nickname,
        title,
        content,
        );

        
    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
        postId: createdPost.postId,
        nickname: createdPost.nickname,
        title: createdPost.title,
        content: createdPost.content,
        createdAt: createdPost.createdAt,
        updatedAt: createdPost.updatedAt,
        };
        
    }catch(err){
        next(err);
    };
};


/* 게시글 목록 조회 */
findAllPosts = async () => {

    const posts = await this.PostRepository.findAllPosts();

    //게시글 내림차순 정렬
    posts.sort((a,b) =>{
        return b.createdAt - a.createdAt;
    });


    // content를 뺸 상태로 controller 에게 res 을 전달  // userId 추가해야함
    return posts.map((post) =>{
        return {
            UserId : posts.userId,
            postId : posts.postId,
            nickname : posts.nickname,
            title : posts.title,
            createdAt : posts.createdAt,
            updatedAt : posts.updatedAt
        }
    })
}

/* 게시글 상세 조회 */
findPostById = async (postId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postRepository.findPostById(postId);

    return {
      UserId : post.userId,
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };


/* 게시글 수정  */

updatePost = async (postId, title, content) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postRepository.findPostById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.postsRepository.updatePost(postId, title, content);

    // 변경된 데이터를 조회합니다.
    const updatedPost = await this.postsRepository.findPostById(postId);

    return {
      UserId : updatedPost.userId,
      postId: updatedPost.postId,
      nickname: updatedPost.nickname,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  };

  /* 게시글 삭제 */

  deletePost = async (postId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postRepository.findPostById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.postsRepository.deletePost(postId);

    return {
      UserId : post.userId,
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };


};
