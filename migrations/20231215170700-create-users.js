'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('Users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 10000,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('Users');
    },
};