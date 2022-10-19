const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsersRepository = require('../repositories/users.repositories');
const { ValidationError } = require('../exceptions/index.exception');

class UsersService {
    constructor() {
        this.usersRepository = new UsersRepository();
    }

    // 회원 가입
    createUser = async ({ nickname, password }) => {
        // nickname 중복 확인
        const isExistUser = await this.usersRepository.findUser(nickname);

        if (isExistUser) {
            if (isExistUser.nickname === nickname) {
                throw new ValidationError(
                    '동일한 Nickname을 가진 User가 이미 존재합니다.',
                );
            }
        }

        // 비밀번호 암호화
        const hashed = await this.createHashedPassword(password);

        const user = await this.usersRepository.createUser({
            nickname,
            password: hashed,
        });

        return user;
    };

    // 로그인
    login = async ({ nickname, password }) => {
        // nickname으로 user찾기
        const user = await this.usersRepository.findUser(nickname);

        // 가입된 유저인지 확인
        if (!user) {
            throw new ValidationError('nickname 혹은 password를 확인해주세요.');
        }

        // password 일치여부 확인
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res
                .status(401)
                .json({ message: 'nickname 혹은 password를 확인해주세요.' });
        }

        return user;
    };

    // 비밀번호 암호화
    createHashedPassword = async (password) => {
        return await bcrypt.hash(
            password,
            Number(process.env.BCRYPT_SALT_ROUNDS),
        );
    };

    // 비밀번호 복호화
    passwordDecryption = async (password, hashed) => {
        return await bcrypt.compare(password, hashed);
    };

    // 토큰 발행
    tokenIssuance = (nickname) => {
        const hashed = jwt.sign({ nickname }, process.env.JWT_SECRET_KET, {
            expiresIn: process.env.JWT_EXPIRES,
        });
        return hashed;
    };

    // 로그인 검증
    loginValidation = async (nickname) => {};
}

module.exports = UsersService;
