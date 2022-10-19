const Joi = require('joi');
require('dotenv').config();
const usersService = require('../services/users.services');

class usersController {
    constructor() {
        this.usersService = new usersService();
    }

    /**
     * @param {import("express").request} req - express Request
     * @param {import("express").response} res - express Response
     * **/
    login = async (req, res) => {
        try {
            // body data 객체분해할당
            const { nickname, password } = req.body;

            // 로그인 로직 호출
            const user = await this.usersService.login({
                nickname,
                password,
            });

            // 인증 쿠키 발급
            const token = this.usersService.tokenIssuance(nickname);
            res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`);

            // 로그인 성공 메시지 반환
            res.status(200).json({
                msg: `${user.nickname}님, 환영합니다!`,
                token: `${token}`,
            });
        } catch (error) {
            // Error
            console.error(error);
            res.status(error.status || 400);
            res.json({ errorMessage: error.message });
        }
    };

    /**
     * @param {import("express").request} req - express Request
     * @param {import("express").response} res - express Response
     * **/
    createUser = async (req, res) => {
        try {
            // 유효성 검사용 스키마
            const usersSchema = Joi.object({
                nickname: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,20}$'))
                    .required(),
                password: Joi.string().min(4).required(),
                confirm: Joi.ref('password'),
            });

            // body data 유효성 검사 및 객체분해할당
            const { nickname, password, confirm } =
                await usersSchema.validateAsync(req.body);

            // Service 유저생성로직 호출
            await this.usersService.createUser({ nickname, password });

            // 회원가입 성공 메시지 반환
            res.status(201).json({
                msg: `${nickname}님, 회원가입을 축하드립니다!`,
            });
        } catch (error) {
            // Error
            console.error(error);
            res.status(error.status || 400);
            res.json({ errorMessage: error.message });
        }
    };
}

module.exports = usersController;
