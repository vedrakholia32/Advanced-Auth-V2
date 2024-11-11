import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail app password
    }
});

const mailOptions = {
    from: 'testforpython74@gmail.com',
    to: "vedrakholia525@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent using Gmail SMTP.",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error occurred:", error);
        return;
    }
    console.log("Email sent successfully:", info.response);
});

