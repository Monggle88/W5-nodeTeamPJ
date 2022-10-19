'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Users, { foreignKey: 'userId' }); // Users에서 userId를 받아온다.

            this.hasMany(models.Comments, {
                as: 'Comments',
                foreignKey: 'postId',
            });
            this.hasMany(models.Likes, {
                as: 'Likes',
                foreignKey: 'postId',
            });
        }
    }
    Posts.init(
        {
            postId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
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
            title: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            likes: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
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
            modelName: 'Posts',
        },
    );
    return Posts;
};
