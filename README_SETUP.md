# Contact Form Setup Instructions

## Prerequisites
- Node.js installed (v14 or higher)
- An email account (Gmail recommended)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the root directory with the following content:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
EMAIL_TO=your-email@gmail.com

# SMTP Configuration (Gmail defaults)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Gmail App Password Setup

If you're using Gmail, you'll need to create an App Password:

1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification (enable it if not already enabled)
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASS` in your `.env` file

**Note:** Do NOT use your regular Gmail password. You must use an App Password.

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

### 5. Test the Contact Form

1. Open your browser and go to `http://localhost:3000`
2. Scroll to the "Get In Touch" section
3. Fill out the form and submit
4. Check your email inbox for the message

## Troubleshooting

### Email not sending?
- Verify your `.env` file has the correct credentials
- For Gmail, make sure you're using an App Password, not your regular password
- Check the server console for error messages
- Verify your SMTP settings match your email provider

### Port already in use?
- Change the `PORT` in your `.env` file to a different number (e.g., 3001, 5000)

### CORS errors?
- Make sure the frontend and backend are running on the same origin
- The server is configured to allow CORS from the same origin

## Production Deployment

For production:
1. Set `NODE_ENV=production` in your `.env` file
2. Use environment variables provided by your hosting platform
3. Make sure your `.env` file is not committed to version control (it's in `.gitignore`)

