const express = require('express');
const usersController = require('../controllers/users.controller');
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const router = express.Router();
const userController = new usersController();

// 회원 가입
// {
//     "nickname": "Developer",
//     "password": "1234",
//     "confirm": "1234"
// }
router.post('/signup', authLoginUserMiddleware, userController.createUser);

// 로그인
// {
//     "nickname": "Developer",
//     "password": "1234"
// }
router.get('/login', authLoginUserMiddleware, userController.login);

module.exports = router;
