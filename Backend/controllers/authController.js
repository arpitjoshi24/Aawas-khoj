// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { transactionalEmailApi, sender } = require('../config/brevo');

// ✅ Request Email Verification
exports.requestVerification = async (req, res) => {
  try {
    const { email, name, password, phone } = req.body;

    if (!email || !name || !password || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

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
      sender, // from brevo.js (.env)
      subject: 'Your Verification Code',
      htmlContent: `<p>Hello ${name}, your verification code is <strong>${code}</strong></p>`
    };

    await transactionalEmailApi.sendTransacEmail(sendSmtpEmail);

    return res.json({ success: true, message: 'Verification code sent!' });

  } catch (error) {
    console.error("Email error:", error.response?.text || error.message || error);
    return res.status(500).json({ success: false, message: 'Failed to send verification email' });
  }
};

// ✅ Verify Code
exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and code are required', verified: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found', verified: false });
    }

    if (user.verificationCode && user.verificationCode.trim() === code.trim()) {
      user.isVerified = true;
      user.verificationCode = '';
      await user.save();

      return res.json({ message: 'Email verified successfully!', verified: true });
    } else {
      return res.status(400).json({ message: 'Invalid or expired code', verified: false });
    }
  } catch (error) {
    console.error('Verify code error:', error);
    return res.status(500).json({ message: 'Server error during verification', verified: false });
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
