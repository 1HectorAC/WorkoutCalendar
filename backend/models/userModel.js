const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});

userSchema.statics.login = async function(email,password){
    // validation
    if(!email || !password){
        throw Error('All fields must be entered');
    }
    const user = await this.findOne({ email });
    if(!user){
        throw Error('Incorrect Email');
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        throw Error('Incorrect Password');
    }

    return user;

}

userSchema.statics.signup = async function(email,password){
    // Validation
    if(!email || !password){
        throw Error('All fields must be entered');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong Enough');
    }
    const exits = await this.findOne({email});
    if(exits){
        throw Error('Email already in use');
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    
    const user = await this.create({email, password:hash});
    return user;
}


module.exports = mongoose.model('User', userSchema);