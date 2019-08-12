const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config');
const uuidv1 = require('uuid/v1');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/user.model");

// @route POST register
// @desc Register user
// @access Public
exports.register = function(req, res) {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
        return res.status(400).json({ email: "Email already exists" });
        } 
  
        const newUser = new User({
            userid: uuidv1(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });
    });
};

// @route POST login
// @desc Login user and return JWT token
// @access Public
exports.login = function(req, res) {
 
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    userid: user.userid,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    config.keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            userid: payload.userid,
                            name: payload.name, 
                            token: "Bearer " + token
                        });
                        console.log('login email password success');
                    }
                );

            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
};

// @route GET login
// @desc get user proifle
// @access Public
exports.profile = async (req, res) => {
if (!('authorization' in req.headers)) {
    return res.status(401).json({ notAuthorised: "Not Authorised" });
    }

    const auth = await req.headers.authorization;
    const { userid } = JSON.parse(auth);
    console.log("userid = %s", userid);
            
    // Find user by email
    User.findOne({ userid }).then(user => {
        // Check if user exists
        if (!user) {
            console.log("user profile not found");
            return res.status(404).json({ profilenotfound: "Profile not found" });
        }
        
        // Need camelcase in the frontend
        console.log("profile request success with user.name = %s", user.name);
        return res.status(200).json({
            success: true,
            name: user.name 
        });
    });
};
