const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
signInToken = (user) => {
    return JWT.sign({
        iss: 'garo7011', //issued by
        sub: user.id, //uniqueid
        iat: new Date().getTime(), //issued at current time
        exp: new Date().setDate(new Date().getDate() + 1) //exp date is current time + 1 day
    }, JWT_SECRET);
}
module.exports = {
    signUp: async (req, res, next) => {
        //Email & Password
        console.log("value of req.value.body = ", req.value.body);
        console.log('userController.signUp called');
        // const email = req.value.body.email;
        //const password = req.value.body.password;
        const { email, password } = req.value.body; //This statement is equivalent to above two statements. 
        //check the user with same email
        const findUser = await User.findOne({ email: email });
        console.log(findUser);
        if (findUser) {
            return res.json({ error: 'Email is already present' }).status(403);
        }
        //create a new user
        const newUser = new User({
            email: email,
            password: password
        }, { _id: false });
        //The above statement can be written as:
        //const newUser = new User({email, password});
        await newUser.save();
        //res.json({user:'created'}).status(200);
        //generate a token
        const token = signInToken(newUser);
        //respond with token
        res.json({ token: token }).status(200);
    },
    signIn: async (req, res, next) => {
        //Generate Token (secret hash)
        const token = signInToken(req.user);
        console.log('userController.sigIn called');
        res.status(200).json({ token: token });
    },
    secret: async (req, res, next) => {
        console.log('userController.secret called');
        res.json({ secret: 'resource' });
    }
}