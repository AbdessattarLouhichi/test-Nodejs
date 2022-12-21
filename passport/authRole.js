const User = require('../models/authentication');
module.exports = function authRole(Role){ 
    return (req,res,next)=>{
        const user =  req.user;
        //console.log(user.role)
        if (user.role !== Role) {
            res.status(401).json('Not allowed')
        } else {
            next()
        }
    }
}

