const ErrorHandler = require("../utils/errorHandler.js");


module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message ||"Internal server error";

    if(err.name ==="CastError"){
        const message = "Invalid object Id - check again";
        err = new ErrorHandler(message,400);
    }

    if(err.code===11000){
        const message = `Email already exists`;
        err = new ErrorHandler(message,400);
    }
    if(err.name==="JsonWebTokenError"){
        const message = `Web token is invalid, try again`;
        err = new ErrorHandler(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message = `Web token is expired, try again`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
}
//! cannot understand how this works