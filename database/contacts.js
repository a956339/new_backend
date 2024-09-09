const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
   name:String,
    mobile:Number,
    email:String,
    message:String
});


module.exports =  mongoose.model("contacts",contactSchema);