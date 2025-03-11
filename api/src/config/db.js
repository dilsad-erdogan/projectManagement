const mongoose = require('mongoose');

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully connected to db.");
    } catch(error){
        throw error;
    }
}

module.exports = connect;