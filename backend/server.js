const app = require("./app.js");
const dotenv = require("dotenv");
const connecttoDatabase = require("./config/database.js");
const cloudinary = require("cloudinary");


//! why it is not closing server
//*When this event is triggered, your server should shut down immediately without gracefully closing.
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Uncaught exception");
    process.exit(1);
})



dotenv.config({path: "backend/config/config.env"});
//* connecting to database(atlas)
connecttoDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
});


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Server shutting down");

    server.close(()=>{
        process.exit(1);
    });
})