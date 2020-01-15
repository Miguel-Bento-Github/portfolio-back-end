const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const create = (req, res) => {};

router.post("/send", (req, res) => {
  let emailContent = `
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>
      <h3>Message: </h3>
      <p>${req.body.message}<p></li>
  </ul>`;

  const msg = {
    to: "miguel.angelo.f.bento@gmail.com",
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.subject,
    html: emailContent
  };

  sgMail.send(msg, (error, result) => {
    if (error) {
      res.send(500, error);
    } else {
      res.send(200);
    }
  });
});

module.exports = { router };
