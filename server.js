const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log('Email transporter error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all fields' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please enter a valid email address' 
            });
        }

        // Sanitize inputs to prevent spam triggers
        const sanitizedName = name.replace(/[<>]/g, '');
        const sanitizedEmail = email.replace(/[<>]/g, '');
        const sanitizedMessage = message.replace(/[<>]/g, '');

        // Email content with improved deliverability
        const mailOptions = {
            from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO || process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
            replyTo: sanitizedEmail,
            subject: `Portfolio Contact: ${sanitizedName}`,
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high',
            },
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px;">
                        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-top: 0;">
                            New Contact Form Submission
                        </h2>
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
                            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
                            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #4CAF50;">${sanitizedEmail}</a></p>
                            <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                            <p style="margin: 15px 0 10px 0;"><strong>Message:</strong></p>
                            <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px; white-space: pre-wrap;">
${sanitizedMessage.replace(/\n/g, '\n')}
                            </div>
                        </div>
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
                            <p style="margin: 5px 0;">This email was sent from your portfolio contact form.</p>
                            <p style="margin: 5px 0;">To reply, simply reply to this email or click the email address above.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Date: ${new Date().toLocaleString()}

Message:
${sanitizedMessage}

---
This email was sent from your portfolio contact form.
To reply, simply reply to this email.
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully:', info.messageId);
        console.log('From:', name, email);
        console.log('Message:', message);

        res.json({ 
            success: true, 
            message: 'Thank you for your message! I\'ll get back to you soon.' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Sorry, there was an error sending your message. Please try again later.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

