const User = require('../models/User');

const router = require('express').Router();

//test
/* router.get('/', (req,res) =>{
    res.send("Hey, it's user route");
}); */
//Update user
router.put('/:id', async (req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
               /*  const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                 */
                req.body.password = req.body.password;

            }catch(error){
                return res.status(500).json(error);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json('Account has been updated');
        }
        catch(error){
            return res.status(500).json(error);
        }   
    }else{
        return res.status(401).json('You can only update your account');
    }
});

//Delete user

//Get a user
router.get("/", async (req,res) => {
    const userId = req.query.userId;
    const userName = req.query.username;
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username:userName});
        const {password,updatedAt,...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
    
})
//Follow user

//Unfollow user


module.exports = router;