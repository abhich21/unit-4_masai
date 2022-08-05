const nodemailer = require("nodemailer");


module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "56859087bcc186", // generated ethereal user
      pass: "a949817137b5e2", // generated ethereal password
    },
  });