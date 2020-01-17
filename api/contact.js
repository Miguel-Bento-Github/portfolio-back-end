const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const create = async (req, res) => {
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
    const status = await sgMail.send(msg);
    return { success: status };
  } catch (error) {
    return "error", error;
  }
};

router.post("/send", async (req, res) => {
  const status = await create(req);
  if (status.success) {
    res.sendStatus(200, status.success);
  } else {
    res.sendStatus(500);
  }
});

module.exports = { router };
