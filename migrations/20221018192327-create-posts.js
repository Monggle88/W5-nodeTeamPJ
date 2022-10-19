'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            postId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    // 참조 값
                    model: 'Users', // 참조할 테이블
                    key: 'userId', // 참조할 키
                },
                onDelete: 'cascade', // 부모로 가져온 값이 삭제된다면 해당 컬럼과 연동되어 삭제됨
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            likes: {
                defaultValue: 0,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                defaultValue: Sequelize.NOW,
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                defaultValue: Sequelize.NOW,
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    },
};
