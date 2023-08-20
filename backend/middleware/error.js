const ErrorHandler = require("../utils/errorHandler.js");


module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message ||"Internal server error";

    if(err.name ==="CastError"){
        const message = "Invalid object Id - check again";
        err = new ErrorHandler(message,400);
    }
    res.status(err.statuscode).json({
        success:false,
        message:err.message
    })
}
//! cannot understand how this works