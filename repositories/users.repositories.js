const { Users } = require('../models');
const { Op } = require('sequelize');

class UsersRepository {
    constructor() {}

    findUser = async (nickname) => {
        const user = await Users.findOne({
            where: {
                nickname: nickname,
            },
        });

        return user;
    };

    createUser = async ({ nickname, password }) => {
        const user = await Users.create({
            nickname,
            password,
        });

        return user;
    };
}

module.exports = UsersRepository;
