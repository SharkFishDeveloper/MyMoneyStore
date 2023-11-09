const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require('crypto');
const cloudinary = require("cloudinary");
const User = require("../models/usermodel.js");
const sendToken = require("../utils/jwToken.js");


exports.registerUser = catchAsyncErrors(async(req,res)=>{
    
    const cloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatar",
        width:150,
        crop:"scale",
    })

    const {name,email,password,avatar} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: cloud.public_id,
            url: cloud.secure_url
        }
    });
    sendToken(user,201,res);

});
//* logging user

exports.logUser = catchAsyncErrors(
    async(req,res,next)=>{
        const {email,password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Enter email & password",400));
        }
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHandler("Invalid email or password",))
        }
        const ispassword = await user.comparePassword(password);
        
        if(!ispassword){
            return next(new ErrorHandler("Invalid email or password",));
        }
        sendToken(user,200,res);
        console.log("Sent newcookie request");

    }
);

exports.logOut = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:"logged out"
    })
});

//* Forgot password
exports.forgotPassword = catchAsyncErrors(
    async(req,res,next)=>{
        const user = await User.findOne({email:req.body.email});
        
        if(!user){
            return next(new ErrorHandler("User does not exist",404));
        }
        const resetToken = user.getResetedPasswordToken();
        await user.save({validateBeforeSave:false});

        //* Url for reseting password
        const resetPassUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

        const resetPasswordMessage = `To change password click on this link,\n\n ${resetPassUrl}\n\nIf you have not requested this email, please ignore it.` 
        //console.log(resetPasswordMessage);
        try {
            await sendEmail({
                email:user.email,
                subject:"Ecommerse Password change",
                resetPasswordMessage
            })
            res.status(200).json({
                success:true,
                message:`Email sent to ${user.email} successfully`
            })
        } catch (error) {
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save({validateBeforeSave:false});
            console.error("Error while sending email:", error); 
            return next(new ErrorHandler("Reset password failed,500"));
        }
    }
);
//* resetPassword 
exports.resetPassword = catchAsyncErrors(
    async(req,res,next)=>{
        const findHashedpassword = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken:findHashedpassword,
            resetPasswordExpire:{$gt:Date.now()}
        });

        if(!user){
            return next(new ErrorHandler("Token for resetting password is invalid or expired",404));
        }

        if(req.body.password !== req.body.confirmpassword){
            return next(new ErrorHandler("Password does not match",400));
        }
        user.password = req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        sendToken(user,200,res);
    }
);
//* get user details
exports.userDetails = catchAsyncErrors(
    async(req,res,next)=>{
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success:true,
            message:"This is user deatils",
            detailsOfuser:user
        });
    }
);

//* update user profile
exports.updateUserProfile = catchAsyncErrors(
    async(req,res,next)=>{
        const cloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatar",
            width:150,
            crop:"scale",
        });

        const newUserData = {
            name:req.body.name,
            email:req.body.email,
            avatar:{
            public_id: cloud.public_id,
            url: cloud.secure_url
        }
        }

        const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            
        });

        res.status(200).json({
            success:true,
            userDetailsUpdated:user,
            updatedSuccessfully:user
        });
    }
);

//* get users for admin
exports.getAllUsers = catchAsyncErrors(
    async(req,res,next)=>{
        const users = await User.find();
        const totalUsers = await User.countDocuments();
        res.status(200).json({
            success:true,
            totalUsers:totalUsers,
            allusers:users
        });
    }
);

//* get specific user details
exports.getSpecificUserDetails = catchAsyncErrors(
    async(req,res,next)=>{
        const user = await User.findById(req.params.id);
        
        if(!user){
            return next(new ErrorHandler(`User with id: ${req.params.id} does not exist`,400))
        }
        res.status(200).json({
            success:true,
            searchedUser:user
        });
    }
);

//* update user role--admin
exports.updateUserRole = catchAsyncErrors(
    async(req,res,next)=>{

        const newUserData = {
            name:req.body.name,
            role:req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
            new:true,
            runValidators:true,
            //useFindAndModify
        });

        res.status(200).json({
            success:true,
            userAfterUpdatingRole:user
        });
    }
);

//* delete user--admin
exports.deleteUser = catchAsyncErrors(
    async(req,res,next)=>{
        const user = await User.findById(req.params.id);
        
        if(!user){
            return next(new ErrorHandler(`User with id: ${req.params.id} does not exist`,400))
        }
        await user.deleteOne();
        res.status(200).json({
            success:true,
            deletedUser:user
        });
    }
);

