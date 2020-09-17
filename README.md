# strapi-provider-email-mailtrap

Mailtrap provider for Strapi CMS

## How to install it

Using npm: `npm install strapi-provider-email-mailtrap --save`

Using yarn: `yarn add strapi-provider-email-mailtrap`

## Prerequisites

- You need a Mailtrap account: https://mailtrap.io
- From the inbox page get your `username` and `password`.


## How to use it

Instruct the email plugin to use the mailtrap provider.

```javascript
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'mailtrap',
    providerOptions: {
      user: env('MAILTRAP_USER', 'default_user'),
      password: env('MAILTRAP_PASSWORD', 'default_pass')
    },
    settings: {
      defaultFrom: env('MAILTRAP_DEFAULT_FROM', 'default@value.com'),
      defaultReplyTo: env('MAILTRAP_DEFAULT_REPLY_TO', 'default@value.com'),
    },
  }
  // ...
});
```

If you want to use it in every environment, you should add the above code to `config/plugins.js`.

If you want to use it in a certain environment, you should add the above code to `config/env/plugins.js`.
