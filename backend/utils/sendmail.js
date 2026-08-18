const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
    try {
        if (!to || !subject || !text) {
            throw new Error('Email recipient, subject, and text are required');
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('Email credentials are not configured. Skipping email send.');
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error.message || error);
    }
};

module.exports = sendEmail;