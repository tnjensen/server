const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    try{
        mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology: true}, () =>{
            console.log('Connected to MongoDB');
            }
        )
    }
    catch(error) {
        console.log('Unable to connect to MongoDB', error);
    }
}

module.exports = dbConnect;