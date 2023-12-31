console.log('Test d\'envoi d\'email')

const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
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


function sendNotification(price) {

 const transporter = nodemailer.createTransport({
  // service: "ethereal",: https://ethereal.email/
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
   user: 'rudolph75@ethereal.email',
   pass: 'd9hFudmX6tQnngXQBN'
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

 let info = transporter
  .sendMail({
   from: '"PC Cdiscount" <julien.azbrg@gmail.com>',
   to: "GrCOTE7@gmail.com",
   subject: "Prix sous les " + price + "€",
   html: "Le prix de la tour est de " + price + "€",
  })
  .then(() => console.log("Message envoyé"))
  .catch((error) => console.error("Erreur lors de l'envoi du message", error));
};

sendNotification(555);