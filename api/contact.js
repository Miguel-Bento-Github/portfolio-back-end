const express = require("express");
const router = express.Router();
const ContactModel = require("../models/Contact");
const nodemailer = require("nodemailer");

async function getAll() {
  return await ContactModel.find();
}
async function create(data) {
  return await ContactModel.create(data);
}

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.send(dbRes))
    .catch(err =>
      res.status(500).send({ message: "Database error", err: err.message })
    );
});

router.post("/send", (req, res) => {
  console.log(req.body);
  let output = `
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>
      <h3>Message: </h3>
      <p>${req.body.message}<p></li>
  </ul>`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "portfoliosender19812783123@gmail.com",
      pass: "p@ssw0rd4Portfolio"
    }
  });

  // send mail with defined transport object
  let options = {
    from: `Portfolio ${req.body.email}`,
    to: "miguel.angelo.f.bento@gmail.com",
    subject: req.body.subject,
    text: "Hi",
    html: output
  };

  transporter.sendMail(options, (err, info) => {
    err ? console.log(err) : console.log("Message sent: %s", info.messageId);
  });
});

module.exports = { router, getAll, create };
