const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//test
router.get('/', (req,res) =>{
    res.send("Hey, it's the auth route");
});

//Register
router.post('/register', async (req,res) =>{
    try{
        //generate hashed password
        /* const salt = await bcrypt.genSalt(10); */
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        })
        
        //save new user and return the response
        const user = await newUser.save();
        res.status(200).send({
            message: "User created successfully.",
            user
        });
    }catch(error){
        res.status(500).send({
            message: "Error creating user.",
            error
        });
    }
})

//Login
router.post('/login', async (req,res) =>{
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json('User not found');

        const validPassword = bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('wrong password');
        
        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email
        }, 
            "RANDOM-TOKEN",
            {expiresIn: "24h"}
        )
       
        res.status(200).send({
            message: "Login successful",
            email: user.email,
            token
        });
        return res.json().then(err => Error(err));
    }
    catch(error){
        /* res.status(500).json(error); */
        console.log(error);
    }
    
})

//Free endpoint
router.get('/free', (req,res)=> {
    res.send({message: "This endpoint has free access"});
})
//Auth endpoint
router.get('/auth', (req,res)=> {
    res.send({message: "You are authorized"});
})

module.exports = router;