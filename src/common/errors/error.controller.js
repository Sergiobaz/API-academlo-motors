import { AppError } from "./appError.js";
import { envs } from "../../config/enviorments/enviorments.js";

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "fail"

    if (envs.NODE_ENV === "development" ) {
        sendErrorDev(err, res)
    }

    if (envs.NODE_ENV === "production" ) {
        let error = err


        sendErrorProd(error, res)
    }
}