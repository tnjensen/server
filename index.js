const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const dbConnect = require('./dbConnect');
const morgan = require("morgan");
const PORT = process.env.PORT || 3030;

app.use(cors());

dbConnect();

/* mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}, () =>{
    console.log('Connected to MongoDB');
})
 */
//middleware
app.use(express.json()); //parser
app.use(morgan("common"));

//Cors fix
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

//test
/* app.get('/', (req,res) => {
    res.send('Welcome to the home page');
});
app.get('/users', (req,res) => {
    res.send('Welcome to the user page');
}); */

/* app.listen(8800, () =>{
    console.log('Backend server is running');
}); */

app.listen(PORT, () =>{
    console.log(`Backend server is running on port ${PORT}`);
});
