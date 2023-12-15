const { Sequelize } = require('sequelize');
const config = require('config');

const user = require('./user');

module.exports.connect = async () => {
    try {
        const sequelize = new Sequelize(config.get('dbUri'));
        await sequelize.authenticate()

        module.exports.sequelize = sequelize;
        module.exports.User = await user.init(sequelize);
    }
    catch (e) {
        console.error('Error connect to db:', e.message);
        return false;
    }

    return true;
};