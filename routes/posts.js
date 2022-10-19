const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { ValidationError } = require('../exceptions/index.exception'); // 에러 핸들러

const router = express.Router();

/**
 * @notice
 *
 * 1. 로그인 권한이 필요한 곳에 'authMiddleware' 미들웨어 붙여주세요!
 *
 * 2. 로그인이 된 상태라면
 * const { nickname } = res.locals.user;
 * 코드로 nickname 바로 불러오기가 가능합니다!
 *
 * 3. Error Handler 적용으로 편한 에러처리가 가능합니다!
 * 아래 예제코드 참고
 */

// 예시 코드
router.get('/', authMiddleware, (req, res, next) => {
    try {
        const { nickname } = res.locals.user;

        const value = true;
        if (value !== true) {
            throw new ValidationError('보내고 싶은 에러 메시지 작성.');
        }

        res.status(200).json({ result: nickname });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
