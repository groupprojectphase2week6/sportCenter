const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {encrypt} = require('../helpers/bcrypt')

const UserSchema = new Schema({
    username:String,
    password:String,
    email:String
})

UserSchema.pre('save', function() {
    // Mongoose will set `isNew` to `false` if `save()` succeeds
    this.password = encrypt(this.password)
});

module.exports = UserSchema















