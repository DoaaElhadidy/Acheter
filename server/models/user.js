const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt-nodejs');//for autentication
const crypto=require('crypto');

const UserSchema=new Schema({
    email:{type:String,unique:true,lowercase:true},
    name:String,
    password:String,
    passwordConfirm:String,
    picture:String,
    isSeller:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false},    
    address:{
        addr1:String,
        addr2:String,
        city:String,
        state:String,
        country:String,
        postalCode: String,
    },
    created:{type:Date,default:Date.now}
});

//Hash/Encrypt Password before saving it in database 
UserSchema.pre('save',function(next){
    var user=this; //this = UserSchema itself 
   //check if the password has changed 
    if(!user.isModified('password'))
    return next();//callback 

    //else do encryption
    //hash is the result of encryption
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err)
        return next(err);
        //set password of user to hashed/encrypted password 
        user.password=hash;
        user.passwordConfirm=hash;
        next();
    });
});

//Compare between the password you entered with a password in the database
UserSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password)
//   return bcrypt.compareSync(PW you entered , PW in DB )
};


//Add an image everytime a user signup
UserSchema.methods.gravatar=function(size){

    if(!this.size) size=200;
    if(!this.email){
        //if the email is not exist return default img 
        return 'https://gravatar.com/avatar/?s'+size+'&d=retro';
    } 
    else
    {
        //if the email is exist ,, hash te password with md5 encryption
        var md5=crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/'+md5+'?s'+size+'&d=retro';
    }

}
const User = mongoose.model('User', UserSchema);

 module.exports = User;
