import { SignupService } from "../services/signupService";


export class signupController {
    signupService = new SignupService();


/* 회원가입 */


createUser = async (req, res ,next) =>{
try{
const { nickname, password, confirm } = req.body;    

// 비밀번호 확인
if (password !== confirm) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }


// 서비스를 호출하여 비밀번호 해시화 수행
const createdUser = await this.signupService.createUser(nickname, password);




// const hashedPassword = await bcrypt.hash(password, 10);

// // Users 테이블에 사용자를 추가합니다.
// const createdUser = await this.signupService.createUser({
//   data: {
//        nickname, 
//        password : hashedPassword,
//       }

// });

return res.status(201).json({ message: "회원가입 성공", user: createdUser });

}catch(err){
    next(err);
}

}





}; // 마지막