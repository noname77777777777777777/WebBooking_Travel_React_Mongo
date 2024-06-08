import NodeMailer from 'nodemailer';

export const SMTPSendMail = async (emailAdmin, emailPass, recipient) => {
    try {
        let transporter = NodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: emailAdmin,
                pass: emailPass,
            },
        });

        let info = await transporter.sendMail({
            from: emailAdmin,
            to: recipient,
            subject: "Subscription Confirmation",
            html: `<h1>Thank you for subscribing!</h1><p>You have successfully subscribed to our travel newsletter.</p>`,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
};
export const sendOTPEmail = async (emailAdmin, emailPass, recipient, otp) => {
    try {
        let transporter = NodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: emailAdmin,
                pass: emailPass,
            },
        });

        let info = await transporter.sendMail({
            from: emailAdmin,
            to: recipient,
            subject: "Your OTP Code",
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
        });

        console.log("OTP sent: %s", info.messageId);
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
        throw error;
    }
};
