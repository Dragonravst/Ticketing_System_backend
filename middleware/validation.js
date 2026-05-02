const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    logger.warn('Validation failed: %o', errors.array());
    
    return res.status(400).json({
        success: false,
        errors: errors.array(),
    });
};

module.exports = validate;
