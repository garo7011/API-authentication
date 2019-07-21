const User = require('../models/user');
module.exports = {
    signUp: async (req, res, next) => {
        //Email & Password
        console.log("value of req.value.body = ", req.value.body);
        console.log('userController.signUp called');
        // const email = req.value.body.email;
        //const password = req.value.body.password;
        const { email, password } = req.value.body; //This statement is equivalent to above two statements. 
        const newUser = new User({
            email: email,
            password: password
        });
        //The above statement can be written as:
        //const newUser = new User({email, password});
        //check the user with same email
        const findUser = await newUser.findOne({email: email});
        console.log(findUser);
        if(findUser){
            return res.json({error:'Email iss already present'}).status(403);
        }
        await newUser.save();
        res.json({user:'created'}).status(200);
    },
    signIn: async (req, res, next) => {
        //Generate Token (secret hash)
        console.log('userController.sigIn called');
    },
    secret: async (req, res, next) => {
        console.log('userController.secret called');
    }
}