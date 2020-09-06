const { admin, db } = require('../util/admin');
const firebase = require('firebase');
const sgMail = require('@sendgrid/mail');

const config = require('../util/config');
const sendGridConfig = require('../util/sendGridConfig');
sgMail.setApiKey(sendGridConfig.apiKey);

firebase.initializeApp(config);

const {validateLoginData} = require('../util/validators');

exports.login = (req, res) => {

    const user = {
      email: req.body.email,
      password: req.body.password
    };
  
    const { valid, errors } = validateLoginData(user);
  
    if (!valid) return res.status(400).json(errors);
  
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return res.json({ token });
      })
      .catch((err) => {
        console.error(err);
        // auth/wrong-password
        // auth/user-not-user
        return res
          .status(403)
          .json({ general: 'Wrong credentials, please try again' });
      });
  };

  exports.getResume = (req, res) => {

    var bucket = admin.storage().bucket();
    const file = bucket.file("resume/resume.pdf");

    const preSignedConfig = {
      action: 'read',
      expires: '03-09-2491',
    };

    file
      .getSignedUrl(preSignedConfig)
      .then((signedUrl) => {

        const urlObj = {
          url : signedUrl[0]
        };

        return res.status(200).json(urlObj);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({error: err.code});
      });

  }

  exports.sendEmail = (req, res) => {

    const toAddress = "salvatorguarnera@gmail.com";
    const fromAddress = "me@salvator.dev";
    const subject = "Email from Portfolio";
    const text = req.body.message;
    const senderEmailAddress = req.body.senderEmail;

    const msg = {
      to: toAddress,
      from: fromAddress,
      subject: subject,
      text: text,
      html: `<p>${text}</p></br>Sendback Email: ${senderEmailAddress}`,
    };

    sgMail
      .send(msg)
      .then(() => {
        return res.status(200).json({message: 'Successfully sent email'});
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({error: err.code});
      });

  }

