const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendmail");

//register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ msg: "Email already exists. Please login" });

    const user = new User({ name, email, password });
    await user.save();

    const html = `
            <h3>Welcome to Eventify 🎉</h3>
<p>Hello {{name}}, your account has been created successfully!</p>

        `;
        await sendEmail("kashish.agrahari@masaischool.com", "New User Registered", html);
        res.status(201).json({msg:"User registered successfully"});
  } catch (error) {
    res.status(500).json({msg:"Server Error"});
  }
};

//login

exports.loginUser= async(req,res)=>{
    try {
        const {email,password}=req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg:"Invalid Credentials"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Credentials"});

        const token =jwt.sign(
            {
                id:user._id, emial:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.status(200).json({msg:"Login Sucessfull"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server Error"})
    }
}
