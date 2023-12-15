const express = require('express');
const { body, } = require('express-validator');

const errors = require('../errors');
const db = require("../../db");

let app = express();

app.on('mount', parent => {
    console.debug('Main app mounted');
});

app.post('/update-balance', [
    body('userId').notEmpty().isNumeric(),
    body('amount').notEmpty().isNumeric(),
], errors.handleValidationErrors, async (req, res, next) => {
    const userId = Number(req.body.userId);
    const amount =  Number(req.body.amount);

    let success = false;
    let balance = null;

    try {
        await db.sequelize.transaction(async t => {
            try {
                const user = await db.User.findOne({where: {id: userId}}, {transaction: t});

                if (user.balance + amount >= 0) {
                    user.balance += amount;
                    success = true;
                }
                balance = user.balance;

                await user.save();
            }
            catch (e) {
                throw new Error(e);
            }
        });
        return res.json({ status: success ? 'Операция успешна' : 'Недостаточно средств', balance });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;