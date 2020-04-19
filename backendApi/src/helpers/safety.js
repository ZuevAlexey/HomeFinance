export const safetyCall = async (req, res, action, defaultValue, logger) => {
    try {
        await action(req, res);
    } catch (error){
        logger.error(`request = ${req} ; error = ${error}; stack = ${error.stack}`);
        await res.json(defaultValue);
    }
};