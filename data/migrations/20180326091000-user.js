const _ = require('lodash');

const { UserStatus } = require('../lcp');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: { primaryKey: true, type: Sequelize.UUID },
            firstName: { allowNull: false, type: Sequelize.STRING(50) },
            lastName: { allowNull: false, type: Sequelize.STRING(50) },
            email: { unique: true, allowNull: false, type: Sequelize.STRING },
            password: { allowNull: false, type: Sequelize.STRING },
            accessTokenSalt: { allowNull: false, type: Sequelize.STRING },
            status: { allowNull: false, type: Sequelize.ENUM, values: _.values(UserStatus) },
            forgotPasswordCode: { type: Sequelize.INTEGER },
            activationCode: { type: Sequelize.INTEGER },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        await queryInterface.addIndex('user', ['firstName', 'lastName', 'createdAt']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('user', {});
    }
};
