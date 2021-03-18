module.exports = {
  send: async (ctx) => {
    try {
      await strapi.plugins['email'].services.email.send({
        to: 'paulbocuse@strapi.io',
        from: 'joelrobuchon@strapi.io',
        cc: 'helenedarroze@strapi.io',
        bcc: 'ghislainearabian@strapi.io',
        replyTo: 'annesophiepic@strapi.io',
        subject: 'Use strapi email provider successfully',
        text: 'Hello world!',
        html: 'Hello world!',
      });
    } catch (error) {
      strapi.log.error('Error when sending the email.', error);
      return ctx.BadRequest('Error when sending the email.');
    }
    return 'Email sent.'
  }
}
