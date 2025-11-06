const connectToDB = require("./config/db");
const express= require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
connectToDB();

const app=express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/events", require("./routes/event.routes"))
app.use("/api/tickets", require("./routes/ticket.routes"));
app.get("/", (req,res)=>{
    res.send("Eventify API runnung")
})

const PORT= process.env.PORT||3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});