const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel.js");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    console.log(token);
//* how this token is reading cookies

if(!token){
    return next(new ErrorHandler("PLease login first",401));
}
const decodedId = jwt.verify(token,process.env.JWT_SECRETKEY);

req.user = await User.findById(decodedId.id);//* assigns req to req.user!!
//*important
next();
});

exports.isAdmin = (...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403))
        }
        next();
    }
}