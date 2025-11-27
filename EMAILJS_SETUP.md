# EmailJS Setup Guide for GitHub Pages

Since GitHub Pages only hosts static files (no backend servers), we're using EmailJS to send emails directly from the browser.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)

## Step 2: Set Up Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your email provider)
4. Connect your Gmail account
5. Note your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:**
```
Portfolio Contact: {{from_name}}
```

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
        </h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Name:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px; white-space: pre-wrap;">
{{message}}
            </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
        </p>
    </div>
</body>
</html>
```

4. Set **To Email** to: `915marco@gmail.com`
5. Set **From Name** to: `{{from_name}}`
6. Set **Reply To** to: `{{from_email}}`
7. Save the template
8. Note your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxx`)

## Step 5: Update Your Code

1. Open `index.js`
2. Find these lines (around line 159-161):
   ```javascript
   const serviceId = 'YOUR_SERVICE_ID';
   const templateId = 'YOUR_TEMPLATE_ID';
   const publicKey = 'YOUR_PUBLIC_KEY';
   ```

3. Replace with your actual values:
   ```javascript
   const serviceId = 'service_xxxxxxx';  // Your Service ID
   const templateId = 'template_xxxxxxx'; // Your Template ID
   const publicKey = 'xxxxxxxxxxxxxxxx';   // Your Public Key
   ```

## Step 6: Test the Form

1. Commit and push your changes to GitHub
2. Visit your GitHub Pages site
3. Fill out the contact form
4. Check your email inbox (915marco@gmail.com)

## Troubleshooting

- **"Email service not loaded"**: Make sure the EmailJS script is loaded in your HTML
- **Email not received**: Check your EmailJS dashboard for error logs
- **Rate limit**: Free tier is 200 emails/month. Upgrade if needed.

## Security Note

The public key is safe to expose in frontend code. EmailJS handles security on their end.

