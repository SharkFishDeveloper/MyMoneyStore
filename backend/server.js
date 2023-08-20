const app = require("./app.js");
const dotenv = require("dotenv");
const connecttoDatabase = require("./config/database.js");


process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Uncaught exception");
    process.exit(1);
})



dotenv.config({path: "backend/config/config.env"});
//console.log(process.env.DB_URL);
//* connecting to database(atlas)
connecttoDatabase();

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