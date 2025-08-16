require('dotenv').config(); // 👈 load .env

const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Use .env variable
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const sender = {
  email: process.env.SENDER_EMAIL,
  name: process.env.SENDER_NAME
};

const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = { transactionalEmailApi, sender };
