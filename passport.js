const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('./models/user');
const { JWT_SECRET } = require('./configuration');

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in token
        const user = await User.findById(payload.sub);
        //if user does not exist then handle it
        if (!user) {
            return done(null, false);
        }
        //otherwise return the user
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        //find the user given the email
        const user = await User.findOne({ email: email });
        //if not handle it
        if (!user) {
            return done(null, false);
        }
        //check if the password is correct
        const isMatch = await user.isValidPassword(password);
        //if not handle it
        if (!isMatch) {
            return done(null, false);
        }
        //otherwise return the user
        else {
            done(null, user);
        }
    }
    catch (error) {
        done(error, false);
    }
}));
