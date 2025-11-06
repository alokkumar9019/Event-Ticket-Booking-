const nodemailer = require("nodemailer");
const sendEmail= async(to,subject,html)=>{
    try {
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.GOOGLE_PASS_KEY,
            }
        });
        const mailOptions={
            form: `Eventify <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch (error) {
        console.log("Error sending email", error.message);
    }
}

module.exports=sendEmail;