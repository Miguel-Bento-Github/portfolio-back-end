const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send", (req, res) => {
  let emailContent = `
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>
      <h3>Message: </h3>
      <p>${req.body.message}<p></li>
  </ul>`;

  let mailConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "portfoliosender19812783123@gmail.com",
      pass: "p@ssw0rd4Portfolio"
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  let transporter = nodemailer.createTransport(mailConfig);
  // send mail with defined transport object
  let options = {
    from: `Portfolio ${req.body.email}`,
    to: "miguel.angelo.f.bento@gmail.com",
    subject: req.body.subject,
    text: "Hi",
    html: emailContent
  };

  transporter.sendMail(options, function(error, info) {
    if (error) {
      res.send(500);
    } else {
      console.log("Message sent: " + info.response);
      res.send(200);
    }
  });
});

module.exports = { router };
