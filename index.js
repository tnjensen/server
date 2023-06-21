const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const dbConnect = require('./dbConnect');
const helmet = require("helmet");
const morgan = require("morgan");

app.use(cors());

dbConnect();

/* mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true}, () =>{
    console.log('Connected to MongoDB');
})
 */
//middleware
app.use(express.json()); //parser
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

//test
/* app.get('/', (req,res) => {
    res.send('Welcome to the home page');
});
app.get('/users', (req,res) => {
    res.send('Welcome to the user page');
}); */

app.listen(8800, () =>{
    console.log('Backend server is running');
});

