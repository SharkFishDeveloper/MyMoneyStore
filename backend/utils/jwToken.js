
const sendToken = async (user,statusCode,res)=>{
    const token = await user.jwtToken();

    const options={
        expires: new Date(
            Date.now()+(process.env.COOKIE_EXPIRES_IN*24*60*60*1000)
        ),
        httpOnly:true,
        secure:true,
    }
    console.log("Sending token to browser");
    if(res.cookie('token',token,options)){
        console.log("Sent cookie");
    }
    res.status(statusCode).json({
        success:true,
        detailsOfuser:user,
        token
    });

};
module.exports = sendToken;