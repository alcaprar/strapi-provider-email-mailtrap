'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const nodemailer = require('nodemailer');
const { removeUndefined } = require('strapi-utils');

/* eslint-disable no-unused-vars */
module.exports = {
  provider: 'mailtrap',
  name: 'Mailtrap',
  auth: {
    mailtrapDefaultFrom: {
      label: 'Mailtrap Default From',
      type: 'text',
    },
    mailtrapReplyTo: {
      label: 'Mailtrap Reply To',
      type: 'text',
    },
    mailtrapUser: {
      label: 'Mailtrap user',
      type: 'text'
    },
    mailtrapPassword: {
      label: 'Mailtrap password',
      type: 'text'
    }
  },
  init: (providerOptions= {}, settings= {}) => {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: providerOptions.mailtrapUser || "",
        pass: providerOptions.mailtrapPassword || "",
      }
    });

    return {
      send: async options => {
        return new Promise((resolve, reject) => {
          const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } = options;

          let msg = {
            from: from || settings.mailtrapDefaultFrom,
            to,
            cc,
            bcc,
            replyTo: replyTo || settings.mailtrapReplyTo,
            subject,
            text,
            html,
            ...rest,
          };

          transport.sendMail(removeUndefined(msg), (err, info) => {
            if (err) {
              strapi.log.error('[strapi-provider-email-mailtrap] err', err)
              reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
            } else {
              strapi.log.debug('[strapi-provider-email-mailtrap] Mail sent. Id: ', info.messageId)
              resolve();
            }
          });
        });
      },
    };
  },
};
