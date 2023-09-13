import { prisma } from '../utils/prisma/index.js'

export class signupRepository {

async createUser(nickname, password) {
try {
    // ORM인 Prisma에서 Users 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const user = await prisma.users.create({
    data: {
        nickname,
        password,
    },
    });

return user;
} catch (err) {
    throw err;
    }

}



} //마지막

