const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requireAuth = (req,res, next) => {
    const token = req.cookies.jwt;

    // check json web token exist  & verified
if (token) {
    jwt.verify(token,'sousa secret',(err,decodedToken) => {
        if (err) {
            console.log(err.message);
            res.redirect('/login');
        } else {
            console.log(decodedToken);
            next();
        }
    })
    
} else {
    res.redirect('/login');
}

}
// check current user
const checkUser =  (req,res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token,'sousa secret',async (err,decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = '';
                next();
            } else {
                console.log(decodedToken);

                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
        
    } else {
        res.locals.user = '';
                next();
    }
    
    }
module.exports = { requireAuth, checkUser };