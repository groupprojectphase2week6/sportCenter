const {verify} = require('../helpers/jwt')
const {User} = require('../models')

function authentication(req,res,next){
    if(req.headers.hasOwnProperty('token')){
        let decode = verify (req.headers.token)
        req.decode = decode
        User.findOne({ where : { email : req.decode.email}})
        .then(found => {
            if(found){
                next()
            }else{
                res.status(401).json({msg: 'No Token Found, Not Authenticated'})
            }
        })
    }else{
        res.status(401).json({msg : 'Not Authenticated'})
    }
}

module.exports = authentication