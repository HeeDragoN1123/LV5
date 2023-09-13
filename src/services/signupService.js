import { SignupRepository } from "../repositories/signupRepository";
import Joi from 'joi'

// 유효성 검사 Joi
const re_nickname =/^[a-zA-Z0-9]{3,15}$/;
const re_password =/^[a-zA-Z0-9]{3,15}$/;

const joiUser = Joi.object({
  nickname: Joi.string().pattern(re_nickname).required(),
  password: Joi.string().pattern(re_password).required(),
  confirm: Joi.string().valid(Joi.ref('password')).required(),
});


export class signupService {
    signupRepository = new SignupRepository();

    // constructor() {
    //     this.signupRepository = new SignupRepository();
    //   }

    createUser = async( nickname, password, confirm ) => {
    
    try{
    // 입력 데이터 유효성 검사
    const { err } = joiUser.validate({  nickname, password, confirm }); 
    
    if (err) {
        // 디테일한 정보를 에러 객체에 추가
        err.details.forEach((detail) => {
            err[detail.context.key] = detail.message;
        });

        throw err;
      };

    // 랜덤한 솔트 생성
    const salt = crypto.randomBytes(16).toString('hex');

    // 솔트와 비밀번호를 결합하여 해시화
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // 저장소(Repository)에게 데이터를 요청합니다.
    const createUser = await this.signupRepository.createPost(
        nickname,
        hashedPassword,
        salt
    );      

    // // 저장소(Repository)에게 데이터를 요청합니다.
    // const createUser = await this.signupRepository.createPost(
    //     nickname,
    //     password,
    //     );

    // 비밀번호 해시화 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
        userId: createUser.userId,
        nickname: createUser.nickname,
        };
        
    }catch(err){
        next(err);
    }


    }




} // 마지막