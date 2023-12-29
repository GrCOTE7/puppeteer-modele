console.log('Test d\'envoi d\'email')

const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
require("dotenv").config();
console.log('Avec ' + process.env.MAIL_USER)


let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // tru for 465, false for other ports
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// app.set("port", process.env.PORT || 3000);
// app.listen(app.get("port"), () => {
//  console.log(`server on port ${app.get("port")}`);
// });

let mailOptions = {
  from: process.env.MAIL_USER,
  to: process.env.MAIL_USER,
  subject: 'Test Email',
  text: 'Hello World!',
};


// app.listen(8000, function () {
//  console.log('Server is running on port 8080');
// });

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});