# EmailJS Template Content

Copy and paste this into your EmailJS template's **Content** field:

## Subject:
```
Portfolio Contact: {{name}}
```

## Content (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-top: 0;">
            New Contact Form Submission
        </h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> {{name}}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:{{email}}" style="color: #4CAF50;">{{email}}</a></p>
            <p style="margin: 10px 0;"><strong>Date:</strong> {{date}}</p>
            <p style="margin: 15px 0 10px 0;"><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px; white-space: pre-wrap;">
{{message}}
            </div>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;">This email was sent from your portfolio contact form.</p>
            <p style="margin: 5px 0;">To reply, simply reply to this email or click the email address above.</p>
        </div>
    </div>
</body>
</html>
```

## Template Settings:

**Subject:** `Portfolio Contact: {{name}}`

**To Email:** `915marco@gmail.com`

**From Name:** `{{name}}`

**Reply To:** `{{email}}`

## Template Variables Used:
- `{{name}}` - The person's name
- `{{email}}` - The person's email address
- `{{message}}` - The message content
- `{{title}}` - Used in subject (same as name)

## How to Update:
1. Go to your EmailJS dashboard
2. Navigate to **Email Templates**
3. Click on your template (`template_sawdrhi`)
4. Replace the **Content** field with the HTML above
5. Update the **Subject** to: `Portfolio Contact: {{name}}`
6. Make sure **From Name** is set to: `{{name}}`
7. Make sure **Reply To** is set to: `{{email}}`
8. Save the template

The template will now properly display the person's name, email, and message in a nicely formatted email!

