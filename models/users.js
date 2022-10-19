'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // foreignKey 설정
            this.hasMany(models.Posts, {
                as: 'Posts',
                foreignKey: 'userId',
            });
            this.hasMany(models.Comments, {
                as: 'Comments',
                foreignKey: 'userId',
            });
            this.hasMany(models.Likes, {
                as: 'Likes',
                foreignKey: 'userId',
            });
        }
    }
    Users.init(
        {
            userId: {
                allowNull: false, // 필수 입력값
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            nickname: {
                allowNull: false,
                unique: true, // 테이블 내 유일한 값
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
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
            modelName: 'Users',
        },
    );
    return Users;
};
