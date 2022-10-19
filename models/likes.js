'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            this.belongsTo(models.Users, { foreignKey: 'userId' }); // Users에서 userId를 받아온다.
            this.belongsTo(models.Posts, { foreignKey: 'postId' }); // Posts에서 postId를 받아온다.
        }
    }
    Likes.init(
        {
            likeId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            postId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    // 참조 값
                    model: 'Posts', // 참조할 테이블
                    key: 'postId', // 참조할 키
                },
                onDelete: 'cascade', // 부모로 가져온 값이 삭제된다면 해당 컬럼과 연동되어 삭제됨
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    // 참조 값
                    model: 'Users', // 참조할 테이블
                    key: 'userId', // 참조할 키
                },
                onDelete: 'cascade', // 부모로 가져온 값이 삭제된다면 해당 컬럼과 연동되어 삭제됨
            },
            createdAt: {
                defaultValue: DataTypes.NOW,
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                defaultValue: DataTypes.NOW,
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Likes',
        },
    );
    return Likes;
};
