const express=require("express");
const { getAllEvents, createEvent } = require("../controllers/event.controller");
const router=express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);

module.exports=router;