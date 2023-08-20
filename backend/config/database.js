const mongoose = require('mongoose');

const connecttoDatabase = () => {
    mongoose.connect(process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        }).then(data => {
            console.log(`MongoAtlas connect with server:${data.connection.host}`);
        });
}
module.exports = connecttoDatabase;