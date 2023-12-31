console.log('Test d\'envoi d\'email')

const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();

console.log('Avec ' + process.env.MAIL_USER)


// app.get('/gmail', function (req, res) {
//  let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//    user: process.env.MAIL_USER,
//    pass: process.env.MAIL_PASS,
//   },
//  });
// });

// app.set("port", process.env.PORT || 3000);
// app.listen(app.get("port"), () => {
//  console.log(`server on port ${app.get("port")}`);
// });


// inrq ggsd noqc udim


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Désactiver la vérification du certificat SSL
  },

  // let transporter = nodemailer.createTransport({
  //  host: "smtp.ethereal.email",
  //  port: 587,
  //  secure: false, // true for 465, false for other ports
  //  auth: {
  //   user: process.env.MAIL_USER,
  //   pass: process.env.MAIL_PASS,
  //  },
  //  tls: {
  //   rejectUnauthorized: false, // Désactiver la vérification du certificat SSL
  // },
});
let price = 888;
const mailOptions = {
  from: {
    name: 'Aadminli',
    address: process.env.MAIL_USER
  },
  to: [process.env.MAIL_USER],
  bcc: ["raquin.mariepierre@gmail.com"],
  subject: "Prix sous les " + price + "€",
  text: "Le prix de la tour est en-dessous de " + price + "€",
  html: "Le prix de la tour est en-dessous de <b>" + price + "€</b>",
  attachments: [
    {
      filename: 'page.pdf',
      path: path.join(__dirname, 'page.pdf'),
      contentType: 'application/pdf'
    },
    {
      filename: 'page.png',
      path: path.join(__dirname, 'page.png'),
      contentType: 'application/png'
    }
  ]
}

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter
      .sendMail(mailOptions)
      .then(() => console.log("Message envoyé"))
  }
  catch (error) {
    console.error("Erreur lors de l'envoi du message", error)
  }
}

// let info = transporter
//   .sendMail(mailOptions, mail)
//   .then(() => console.log("Message envoyé"))
//   .catch((error) => console.error("Erreur lors de l'envoi du message", error));

sendMail(transporter, mailOptions);