const User = require('../models/authentication');
module.exports = function authRole(role){
    return (req,res,next)=>{
        const user =  User.findById(req.params.id)
        //console.log(user.firstName)
        if (user.role !==role) {
            res.status(401).json(' you are not allowed')
        } else {
            next()
        }
    }
}

