export default function (err, req, res, next) {
  // 에러 처리를 위한 코드
  
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  
  // 기타 예상치 못한 에러 처리
  console.error(err);
  res.status(500).json({ error: '서버 오류가 발생했습니다.' });
}

