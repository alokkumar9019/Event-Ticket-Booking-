const mongoose= require("mongoose");
const { ref } = require("process");

const ticketSchema= mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    quantity:{type:Number, required:true},
    totalAmount:{type:Number, required:true},
    status:{type:String, enum:["booked", "cancelled"], default:"booked"},
    bookedAt:{type:Date, default:Date.now}

})

module.exports= mongoose.model("Ticket", ticketSchema);