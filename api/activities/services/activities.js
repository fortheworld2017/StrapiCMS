"use strict";

// module.exports = {};
// email send after create activites
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "please use your gmail", // service gmail
    pass: "please use your gmail password", // service gmail password
  },
  tls: { rejectUnauthorized: false },
});

module.exports = {
  send: (subject, text) => {
    // Setup e-mail data.
    const options = {
      from: "please use your gmail",
      to: " info@mallorcard.es",
      subject,
      text,
    };
    return transporter.sendMail(options);
  },
};
