const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwtToken");


//register controller
module.exports.register = async(req, res, next) => {

    try {
        const{ fullName, email, password } = req.body;

        const usernameCheck = await User.findOne({ fullName });
        if(usernameCheck){
            return res.status(400).json({
                success: false,
                message: "User Already Registered!"
            })
        }

        const emailCheck = await User.findOne({ email });
        if(emailCheck){
            return res.status(400).json({
                success: false,
                message: "Email Already Exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            email,
            fullName,
            password: hashedPassword,
        });

        delete user.password;

        generateToken(user, "User Registered!", 200, res);
        
    } catch (error) {
        next(error);
    }
}



//login controller

module.exports.login = async(req, res, next) => {

    try {
        const{ email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid username!"
            })
        }


        //Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({
                status: false,
                message: "Invalid password"
            });
        }
            

        // Remove the password field from the user object before sending the response
        delete user.password;

        generateToken(user, "User LoggedIn Succesfully!", 200, res);
        
    } catch (error) {
        next(error);
    }
}


module.exports.logout = async(req, res, next) => {

    res.status(200).cookie("userToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User Logged Out!!"
    });
}



module.exports.getUserProfile = async (req, res) => {
    // try {
    //     // Retrieve the token from cookies
    //     const token = req.cookies.token;
    //     if (!token) {
    //         return res.status(401).json({ error: 'Unauthorized, no token provided' });
    //     }

    //     // Verify and decode the token
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     // Find the user by decoded user ID and exclude the password field
    //     const user = await User.findById(decoded.userId).select('-password');
    //     if (!user) {
    //         return res.status(404).json({ error: 'User not found' });
    //     }

    //     // Respond with user details
    //     res.status(200).json(user);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }

    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
};