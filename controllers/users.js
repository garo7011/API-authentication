module.exports = {
    signUp: async (req, res, next) => {
        //Email & Password
        console.log("value of req.value.body = " , req.value.body);
        console.log('userController.signUp called');
    },
    signIn: async (req, res, next) => {
        //Generate Token (secret hash)
        console.log('userController.sigIn called');
    },
    secret: async (req, res, next) => {
        console.log('userController.secret called');
    }
}