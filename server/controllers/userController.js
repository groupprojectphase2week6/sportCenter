const UserSchema = require('../models/user')
const mongoose = require('mongoose')
const {decrypt} = require('../helpers/bcrypt')
var User = mongoose.model('User', UserSchema);
const {sign} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

class UserController {
    static register(req,res,next) {
        // console.log('asd');
        User.create(req.body)
            .then((datas) => {
                res.status(201).json(datas)
            })
            .catch(next)
    }

    static login(req,res,next) {
        // console.log('halo');
        User.findOne({email:req.body.email})
            .then((datas) => {
                if(datas) {
                    if(decrypt(req.body.password,datas.password)) {
                        const token = sign({
                            username: datas.username,
                            email: datas.email,
                            _id: datas._id
                        })
                        // console.log(token);
                        res.status(200).json(token)
                    } else {
                        throw {code:404, message: `username/password salah`}
                    }
                } else {
                    throw {code: 404, message: `username/password salah`}
                }
            })
            .catch(next)
    }

    static googleSignIn(req,res,next) {
        let payload
        client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
            .then((ticket) => {
                payload = ticket.getPayload();
                const userid = payload['sub'];
                return User.findOne({email:payload.email})
            })
            .then((emailFound) => {
                // console.log(emailFound);
                if(emailFound) {
                    const token = sign({
                        username: emailFound.username,
                        email: emailFound.email
                    })
                    res.status(200).json(token)
                    // next()
                } else {
                    console.log(emailFound)
                    return User.create({
                        username: payload.name,
                        email: payload.email,
                        password: 12345
                    })
                }
            })
            .then((dataCreated) => {
                // console.log(dataCreated);
                if(dataCreated) {
                    const token = sign({
                        username: dataCreated.username,
                        email: dataCreated.email
                    })
                    res.status(201).json(token)
                } else {
                    next()
                }
            })
            .catch(next)
        // console.log(payload);
    }
}

module.exports = UserController