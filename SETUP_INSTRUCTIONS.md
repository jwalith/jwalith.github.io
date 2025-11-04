# Portfolio Setup Instructions

## 1. EmailJS Configuration

To make the contact form functional, you need to set up EmailJS:

1. **Sign up for EmailJS** (free):
   - Go to https://www.emailjs.com/
   - Create a free account (200 emails/month)

2. **Create an Email Service**:
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create an Email Template**:
   - Go to Email Templates → Create New Template
   - Use these template variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Message content
     - `{{to_name}}` - Your name (Jwalith Kristam)

4. **Get Your Credentials**:
   - Go to Account → API Keys
   - Copy your Public Key
   - Note your Service ID and Template ID

5. **Update `script.js`**:
   - Open `script.js`
   - Find these lines (around line 99-101):
     ```javascript
     const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
     const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
     const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
     ```
   - Replace with your actual credentials:
     ```javascript
     const EMAILJS_SERVICE_ID = 'service_xxxxxxx';
     const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';
     const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
     ```

## 2. Google Analytics Configuration

To track visitors and get detailed analytics:

1. **Create a Google Analytics Account**:
   - Go to https://analytics.google.com/
   - Sign in with your Google account
   - Create a new property for your website

2. **Get Your Measurement ID**:
   - In GA4, go to Admin → Data Streams
   - Click on your web stream
   - Copy your Measurement ID (format: G-XXXXXXXXXX)

3. **Update `index.html`**:
   - Open `index.html`
   - Find these lines (around line 12-17):
     ```html
     <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
     <script>
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'GA_MEASUREMENT_ID');
     </script>
     ```
   - Replace `GA_MEASUREMENT_ID` with your actual Measurement ID (twice):
     ```html
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
     <script>
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-XXXXXXXXXX');
     </script>
     ```

## 3. Visitor Counter

The visitor counter is already set up and working! It:
- Tracks unique daily visits (one count per visitor per day)
- Stores data in browser localStorage
- Displays the count in the footer
- Integrates with Google Analytics for detailed tracking

**Note**: The counter resets if visitors clear their browser data, but Google Analytics will track all visits accurately.

## 4. Testing

1. **Test Contact Form**:
   - Fill out the form and submit
   - Check your email inbox for the message
   - Verify the success notification appears

2. **Test Analytics**:
   - Visit your site
   - Go to Google Analytics → Realtime
   - You should see your visit appear

3. **Check Visitor Counter**:
   - Look at the footer
   - The counter should increment on first visit each day

## Troubleshooting

- **Contact form not working?**
  - Check browser console for errors
  - Verify EmailJS credentials are correct
  - Make sure EmailJS service is active

- **Analytics not tracking?**
  - Verify Measurement ID is correct
  - Check browser console for errors
  - Wait a few minutes for data to appear in GA4

- **Visitor counter not updating?**
  - Clear localStorage and refresh
  - Check browser console for JavaScript errors

## Additional Notes

- EmailJS free tier: 200 emails/month
- Google Analytics is completely free
- All tracking respects user privacy (no personal data collected)
- Visitor counter uses localStorage (client-side only)

