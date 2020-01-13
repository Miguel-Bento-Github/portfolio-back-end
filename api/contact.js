const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const create = (req, res) => {
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
  try {
    sgMail.send(msg);
    res.send(200);
  } catch (error) {
    res.send(500);
  }
};

router.post("/send", (req, res) => {
  create(req)
    .then(() => res.send(200))
    .catch(err =>
      res.status(500).send({ message: "Database error", err: err.message })
    );
});

module.exports = { router };
