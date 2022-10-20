const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsersRepository = require('../repositories/users.repositories');
const usersRepository = new UsersRepository

// 유저 인증에 실패하더라도 에러를 반환하지 않는다.
module.exports = async (req, res, next) => {
    try {
        console.log(12341234)
        const cookies = req.cookies[process.env.COOKIE_NAME];
        if (!cookies) {
            return res.status(403).send({
                errorMessage: '로그인이 필요한 기능입니다.',
            });
        }

        const [tokenType, tokenValue] = cookies.split(' ');
        if (tokenType !== 'Bearer') {
            return res.status(403).send({
                errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.',
            });
        }
        
        const { nickname } = jwt.verify(tokenValue, process.env.JWT_SECRET_KET);
        console.log(nickname)
        const user = await usersRepository.findUser(nickname);
        console.log(1234)
        res.locals.user = user;

        next();
    } catch (error) {
        res.locals.user = { userId: undefined };
        next();
    }
};