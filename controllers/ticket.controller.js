const Ticket= require("../models/ticket.model");
const Event= require("../models/event.model");
const sendEmail=require("../utils/sendmail");

exports.bookTicket= async(req,res)=>{
    try {
        const {eventId, quantity}= req.body;
        if(!eventId || !quantity) {
            return res.status(404).json({msg:"Event id }|| quantity missing"});
        }
        const event=await Event.find(eventId);
        if(!eventId) {
            return res.status(404).json({msg:"Event not found"});
        }

        const totalAmount=event.basePrice*quantity;

        const booking=await Ticket.create({
            userId:req.user.id,
            eventId,
            quantity,
            totalAmount,
        });
        const html=`
            <h3>Eventify - Booking Confirmed </h3>
<p>Your booking is confirmed!</p>
<p><strong>Event:</strong> {{eventName}}</p>
<p><strong>Tickets:</strong> {{quantity}}</p>
<p><strong>Total Amount:</strong> ₹{{totalAmount}}</p>

        `
        await sendEmail(process.env.EMAIL, "Eventify booking confirmed", html);
        res.status(201).json({msg:"Ticket booked sucessfully", bookingId:booking._id, totalAmount})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"})
    }
}