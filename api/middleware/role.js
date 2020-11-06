module.exports = function(req,res , next) {
    console.log(req.user.isAdmin)
    if(!req.user.isAdmin){
        return res.status(401).json('You are not Admin')
    }else {

        next();
    }

}