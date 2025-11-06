const Event=require("../models/event.model");

exports.createEvent=async(req,res)=>{
    try {
        const {name,category,date,basePrice}=req.body;
        if(!name || !category || !date || !basePrice){
            return res.status(404).json({msg:"All fields are required"});
        }
        const event=await Event.create({name,category,date,basePrice});
        res.status(201).json({msg:"Event cfreated sucessfully"});
    } catch (error) {
        res.status(500).json({msg:"Server error"});
    }
}

exports.getAllEvents= async(req,res)=>{
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({msg:"Server error"});
    }
}