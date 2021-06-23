let mongoose = require('mongoose'),
bycrypt = require('bcrypt-nodejs'),
shortid = require('shortid'),
Schema = mongoose.Schema;

let UserSchema = new Schema({
    username:String,
    email:String,
    password:String,
    stream_key:String,
});

UserSchema.methods.generateHash = (password) =>{
    return bycrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

UserSchema.methods.validPassword = function(password){
    return bycrypt.compareSync(password,this.password);
}

UserSchema.methods.generateStreamKey = () =>{
    return shortid.generate();
}

module.exports = UserSchema;

