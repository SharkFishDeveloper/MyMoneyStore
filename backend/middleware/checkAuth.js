const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel.js");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
         console.log(`Cannot read token`);
    }
    console.log(`Reading token form browser ${token}`);

if(!token){
    //console.log("PLease login first");
    return next(new ErrorHandler("PLease login first",401));
}
const decodedId = jwt.verify(token,process.env.JWT_SECRETKEY);
console.log(`Reading token form browser ${token}`);
req.user = await User.findById(decodedId.id);//* assigns req to req.user!!
//*important
console.log(`Middle ware 1 finished`);
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