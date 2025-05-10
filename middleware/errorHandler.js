const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 5000;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 500:
            res.json({
                title: "Server Error",
                message: "Something went wrong",
                stackTrace: err.stack
            });
            break;
        case 401:
            res.json({
                title: "Unauthorized",
                message: "Unauthorized access",
                stackTrace: err.stack
            });
            break;
        case 400:
            res.json({
                title: "Bad Request",
                message: "Invalid request",
                stackTrace: err.stack
            });
            break;
        case 200:
            res.json({
                title: "Success",
                message: "Request was successful",
                stackTrace: err.stack
            });
            break;
        case 201:
            res.json({
                title: "Created",
                message: "Resource was created successfully",
                stackTrace: err.stack
            });
        default:
            console.log("No error, all good");
            res.json({
                title: "Success",
                message: "Request was successful",
                stackTrace: err.stack
            });
            break;
    }
};

module.exports = errorHandler;