const { Umzug, SequelizeStorage } = require('umzug');

module.exports.init = async (sequelize) => {
    module.exports.umzug = new Umzug({
        storage: new SequelizeStorage({ sequelize }),
        context: sequelize.getQueryInterface(),
        storageOptions: {
            sequelize,
        },
        migrations: {
            params: [
                sequelize.constructor,
                () => {
                    throw new Error('Migration error');
                },
            ],
            glob: 'migrations/*.{js,ts,up.sql}',
        },
    });
};