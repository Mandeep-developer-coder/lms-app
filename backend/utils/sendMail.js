const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendOtp = async (email, otp) => {
    const emailDetail = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP for Password Reset - MAIMT",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                <div style="max-width: 550px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
                    <h2 style="text-align: center; color: #2c3e50;">Maharaja Agrasen Institute of Management & Technology</h2>
                    
                    <p>Dear Student,</p>

                    <p>You recently requested to reset your password for your MAIMT Library account. Please use the OTP below to complete the process:</p>
                    
                    <div style="font-size: 28px; font-weight: bold; text-align: center; margin: 25px 0; color: #d32f2f;">
                        ${otp}
                    </div>

                    <p>This OTP is valid for <strong>10 minutes</strong>. Please do not share this code with anyone for security reasons.</p>

                    <p>If you did not request a password reset, you can safely ignore this message.</p>

                    <br />
                    <p>Best regards,<br><strong>MAIMT Library Support Team</strong></p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(emailDetail);
        console.log("OTP email sent successfully.");
        console.log("Mail sent!");
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};
module.exports = sendOtp;