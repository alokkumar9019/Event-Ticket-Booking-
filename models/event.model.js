const mongoose = require("mongoose");

const eventSchema= new mongoose.Schema({
    name:{type:String, required:true},
    category:{type:String, enum:["concert", "sports", "conference","comedy"], required:true},
    date:{type:Date, required:true},
    basePrice:{type:Number, required:true},
    createdAt:{type:Date, default:Date.now},
});

module.exports=mongoose.model("Event", eventSchema);