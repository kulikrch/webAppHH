'use strict';
const { validationResult } = require('express-validator');

exports.handleValidationErrors = (req, res, next) => {
    const errorFormatter = ({ location, msg, param }) => {
        return `${location}[${param}]: ${msg}`;
    };

    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        let errorString = errors.array().reduce((acc, value) => acc + '\n' + value);
        throw { status: 400, description: errorString };
    }

    if (next)
        next();
};