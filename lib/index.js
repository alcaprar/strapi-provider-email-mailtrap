'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const nodemailer = require('nodemailer')

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'mailtrap',
  name: 'Mailtrap',
  auth: {
    mailtrap_default_from: {
      label: 'Mailtrap Default From',
      type: 'text',
    },
    mailtrap_user: {
      label: 'Mailtrap user',
      type: 'text'
    },
    mailtrap_password: {
      label: 'Mailtrap password',
      type: 'text'
    }
  },
  init: config => {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: config.mailtrap_user || "",
        pass: config.mailtrap_password || ""
      }
    })

    return {
      send: options => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = (typeof options === 'object' && options !== null) ? options : {};
          options.from = options.from || config.mailtrap_default_from;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          transport.sendMail(options,
            function(err, info) {
              if (err) {
                strapi.log.error('[strapi-provider-email-mailtrap] err', err)
                reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
              } else {
                strapi.log.debug('[strapi-provider-email-mailtrap] Mail sent. Id: ', info.messageId)
                resolve();
              }
            }
          );
        });
      },
    };
  },
};