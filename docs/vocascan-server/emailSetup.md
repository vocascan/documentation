# Email Setup

## Using generic SMTP

You can directly use the SMTP server from an external email provider like shown below.

```js
  mailer: {
    enabled: true,
    host: 'smtp.example.com',
    port: 587,
    auth: {
      user: 'vocascan@example.com',
      pass: 'password',
    },
    from: '"Vocascan" <vocascan@example.com>',
  },
  service: {
    email_confirm: true,
  },
```

## Developing with Email

If you want to contribute and change something related to the email feature, you can either use Ethereal mail or an self
hosted version like MailCatcher.

### Ethereal

> [Ethereal](https://ethereal.email/) is a fake SMTP service, mostly aimed at Nodemailer users (but not limited to).
> It's a completely free anti-transactional email service where messages never get delivered.

1. Go to https://ethereal.email/
2. Create an free account without any registration
3. Copy the credentials to your vocascan configuration
4. Go to messages on their top bar navigation

### MailCatcher

> [MailCatcher](https://mailcatcher.me/) runs a super simple SMTP server which catches any message sent to it to display
> in a web interface. Run mailcatcher, set your favourite app to deliver to smtp://127.0.0.1:1025 instead of your
> default SMTP server, then check out http://127.0.0.1:1080 to see the mail that's arrived so far.

1. Start MailCatcher inside a docker container

   ```yml
   version: "3"

   services:
     ...
     mailer:
       image: sj26/mailcatcher:latest
       restart: always
       ports:
         - "1080:1080"
         - "1025:1025"
   ```

2. Adjust your vocascan email configuration to use your local pc on port 1025 as email provider.
3. Open `http://localhost:1080`
