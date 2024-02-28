const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },

})

const User=mongoose.model("usersignup",userSchema);

module.exports=User;