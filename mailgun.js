const formData = require('form-data');
const Mailgun = require('mailgun.js');
const nodemailer = require('nodemailer')
const mailgunTransport = require('nodemailer-mailgun-transport')
const mailgun = new Mailgun(formData);
require("dotenv").config();

//2fix Impossible d'envoyer depuis CLI :-(...
// const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

// mg.messages.create('process.env.MAILGUN_DOMAIN', {
// 	from: "Excited User <process.env.MAILGUN_SENDER>",
// 	to: ["grcote7@gmail.com"],
// 	subject: "Hello",
// 	text: "Testing some Mailgun awesomeness!",
// 	html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
// .then(msg => console.log(msg)) // logs response data
// .catch(err => console.log(err)); // logs any error


// // Créer un transporteur pour l'API Mailgun
// const transporter = nodemailer.createTransport(mailgunTransport({
// 	auth: {
// 			api_key: process.env.MAILGUN_API_KEY, // Utiliser la variable d'environnement MAILGUN_API_KEY
// 			domain: process.env.MAILGUN_DOMAIN // Utiliser la variable d'environnement MAILGUN_DOMAIN
// 	}
// }))

const transporter = nodemailer.createTransport(mailgunTransport({
	auth: {
			api_key: process.env.MAILGUN_API_KEY, // Utiliser la variable d'environnement MAILGUN_API_KEY
			domain: process.env.MAILGUN_DOMAIN // Utiliser la variable d'environnement MAILGUN_DOMAIN
	}
}))

// Envoyer un e-mail de test avec le transporteur
transporter.sendMail({
	from: process.env.MAILGUN_SENDER, // Utiliser la variable d'environnement MAILGUN_SENDER
	to: 'grcote7@gmail.com',
	subject: 'Hello from Node.js',
	text: 'This is a test email'
}, (error, info) => {
	if (error) {
			console.error(error)
	} else {
			console.log('Email sent: ' + info.messageId)
	}
})