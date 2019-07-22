const express = require('express');
const router = require('express-promise-router')();

const passport = require('passport');
const passportConfig = require('../passport');
const userController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routeHelpers');

const passportSignIn = passport.authenticate('local', { session: false });
const passportSignUp = passport.authenticate('jwt', { session: false });
router.route('/signup')
    .post(validateBody(schemas.authSchema), userController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, userController.signIn);

router.route('/secret')
    .get(passportSignUp, userController.secret);

module.exports = router;