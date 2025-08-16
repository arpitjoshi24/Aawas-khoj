const bcrypt = require('bcrypt');
const User = require('../models/User');
const { transactionalEmailApi, sender } = require('../config/brevo');

// ✅ Request Email Verification
exports.requestVerification = async (req, res) => {
  const { email, name, password, phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  let user = await User.findOne({ email });

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!user) {
    user = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      verificationCode: code,
      isVerified: false
    });
  } else {
    user.verificationCode = code;
    user.name = name;
    user.phone = phone;
    user.password = hashedPassword;
  }

  await user.save();

  const sendSmtpEmail = {
    to: [{ email, name }],
    sender,
    subject: 'Your Verification Code',
    htmlContent: `<p>Hello ${name}, your verification code is <strong>${code}</strong></p>`
  };
  try {
    await transactionalEmailApi.sendTransacEmail(sendSmtpEmail);
    res.send({ message: 'Verification code sent!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).send({ message: 'Failed to send email' });
  }
};

// ✅ Verify Code
exports.verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (user && user.verificationCode === code) {
    user.isVerified = true;
    user.verificationCode = '';
    await user.save();
    res.send({ message: 'Email verified!', verified: true });
  } else {
    res.status(400).send({ message: 'Invalid code', verified: false });
  }
};

// ✅ Login Function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Email not verified' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
