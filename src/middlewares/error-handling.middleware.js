import {CustomError} from '../utils/prisma/err.js'

export default function (err, req, res, next) {
  // 에러 처리를 위한 코드
  console.error(err); // 에러를 콘솔에 기록 (선택사항)

  // CustomError에 정의된 에러 메시지와 상태 코드를 사용하여 응답
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // 기타 예상치 못한 에러 처리
  console.error(err);
  res.status(500).json({ error: '서버 오류가 발생했습니다.' });
}

