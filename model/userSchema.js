const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zipcode:{
        type:String,
        required:true
    },

})

const User=mongoose.model("userdetails",userSchema);

module.exports=User;