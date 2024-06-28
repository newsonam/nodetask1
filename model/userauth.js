const mongoose=require('mongoose');

const userauthSchema=mongoose.Schema({
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

const Userauth=mongoose.model("usersignup",userauthSchema);

module.exports=Userauth;