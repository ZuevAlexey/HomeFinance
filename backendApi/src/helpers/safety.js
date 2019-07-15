export const safetyCall = (req, res, action, defaultValue, logger) => {
    try {
        action(req, res);
    } catch (error){
        logger.error(`request = ${req} ; error = ${error}; stack = ${error.stack}`);
        res.json(defaultValue);
    }
};