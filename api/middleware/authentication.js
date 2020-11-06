const jwt  =  require('jsonwebtoken');




module.exports = function(req, res , next) {
    const token = req.header('Authorization');
    console.log(token)
    if(!token){
        return res.status(401).json({msg : 'No token , authorize denied'})
    }
    try {
        const newToken = token.split(' ')[1]
        const decoded = jwt.verify(newToken, process.env.JWT_KEY);
        req.user = decoded.user
        next();

    } catch (err) {
        return res.status(401).json({msg : 'Please insert token'})
    }

}

