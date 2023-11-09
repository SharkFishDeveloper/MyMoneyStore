const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is mandatory"],
        maxLength:[20,"Name is too big"],
        minLength:[4,"Name is too small"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"],
        minLength:[6,"Password is too small"],
        select:false
    },
    avatar:{
        
        public_id:{
                type:String,
                required:true
        },
        url:{
                type:String,
                required:true
        },
        
    },
    role:{
        type:String,
        default:"user"
    },
    joinedOn:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
        //* in arrow function this cannot be used
    }
    this.password = await bcrypt.hash(this.password,10)
});

//* name of function is "jwtToken"
userSchema.methods.jwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRETKEY,{
        expiresIn:process.env.JWT_EXPIRESIN
    });
};

userSchema.methods.comparePassword = async function(enterPassword){
    return bcrypt.compare(enterPassword,this.password);
}

userSchema.methods.getResetedPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(`Reset token is :${resetToken}`);
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    console.log(`resetPasswordToken token is :${this.resetPasswordToken}`);
    this.resetPasswordExpire = Date.now() + 10*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User",userSchema);