
const login_user = (req,res) => {
    res.status(200).json({mssg:'loggin user'});
}

const signup_user = (req,res) => {
    res.status(200).json({mssg:'signup_user'});
};

module.exports = {login_user, signup_user};