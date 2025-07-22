const jwt= require('jsonwebtoken')

const secret = 'sk$nanu@123456'

function createTokenForUser(user){
    const payload={
       fulName:user.fulName,
        _id:user._id,
        emial:user.emial,
        profileImageURL:user.profileImageURL,
        role:user.role,
    }

    const token= jwt.sign(payload,secret);
    return token;

}

function validateToken(token){
    const payload= jwt.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}