const mongoose=require('mongoose');

const taskSchema=mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duedate:{
        type:String,
        required:true   
    },
    status:{
        type:String,
        required:true,
    },

})

const Task=mongoose.model("userdata",taskSchema);

module.exports=Task;