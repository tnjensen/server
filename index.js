const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const dbConnect = require('./dbConnect');
const morgan = require("morgan");
const PORT = process.env.PORT || 3030;

app.use(cors());

dbConnect();

//middleware
app.use(express.json()); //parser
app.use(morgan("common"));

//Cors fix
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://mern-auth-mkbw.onrender.com/login");
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    next();
});

app.use("/api/users", userRoute);
app.use("/auth", authRoute);

//test
app.get('/', (req,res) => {
    res.send('Welcome to the home page');
});
app.get('/users', (req,res) => {
    res.send('Welcome to the user page');
});

app.listen(PORT, () =>{
    console.log(`Backend server is running on port ${PORT}`);
});
