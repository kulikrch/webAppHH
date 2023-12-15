const express = require('express');
const config = require('config');

const db = require('./db');
const migration = require('./migration');

const app = express();
const PORT = config.get("port") || 3000;

app.use(express.json());

app.use(require('./routes'));

const startServer = async () => {
    try {
        const connected = await db.connect();
        if (connected) {
            console.debug('Connection to the database has been established successfully.');

            await migration.init(db.sequelize);
            console.debug('Migrations init.');
            await migration.umzug.up()
            console.debug('Migrations have run successfully.');

            app.listen(PORT, () => {
                console.debug(`Server is running on port: ${PORT}`);
            });

            if (!await db.User.findOne({ where: { id: 1 } })) {
                await db.User.create({id: 1});
            }
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();