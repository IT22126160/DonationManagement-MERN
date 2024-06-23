const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const confirmSchema = new Schema({
    
    name : {
        type: String,
        required: true
    },
    phone : {
        type:String,
        required: true
    },

    email:{
        type:String,
        required: true
    },
    time: {
        type: String,  
        required: true
    }



})

const confirmation = mongoose.model("confirmation",confirmSchema);

module.exports=confirmation;