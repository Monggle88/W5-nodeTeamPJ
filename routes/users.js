const express = require('express');
const UsersController = require('../controllers/users.controller');
const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const router = express.Router();
const usersController = new UsersController();

// 회원 가입
// {
//     "nickname": "Developer",
//     "password": "1234",
//     "confirm": "1234"
// }
router.post('/signup', authLoginUserMiddleware, usersController.createUser);

// 로그인
// {
//     "nickname": "Developer",
//     "password": "1234"
// }
router.get('/login', authLoginUserMiddleware, usersController.login);

module.exports = router;
