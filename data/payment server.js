const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/process-vodafone-payment', async (req, res) => {
  const { phoneNumber, amount, meterNumber } = req.body;

  try {
    const token = await authenticateVodafone();
    const response = await sendVodafoneCharge(phoneNumber, amount, token, meterNumber);
    res.status(200).send({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.post('/process-mtn-payment', async (req, res) => {
  const { phoneNumber, amount, meterNumber } = req.body;

  try {
    const token = await authenticateMtn();
    const response = await sendMtnCharge(phoneNumber, amount, token, meterNumber);
    res.status(200).send({ success: true, data: response });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// Replace with your Vodafone credentials and endpoints
async function authenticateVodafone() {
  const response = await axios.post('https://api.vodafone.com/auth/token', {  // <<--- Vodafone Auth Endpoint
    client_id: 'YOUR_CLIENT_ID',  // <<--- Vodafone Client ID
    client_secret: 'YOUR_CLIENT_SECRET',  // <<--- Vodafone Client Secret
    grant_type: 'client_credentials'
  });
  return response.data.access_token;
}

// Replace with your MTN credentials and endpoints
async function authenticateMtn() {
  const response = await axios.post('https://api.mtn.com/auth/token', {  // <<--- MTN Auth Endpoint
    client_id: 'YOUR_CLIENT_ID',  // <<--- MTN Client ID
    client_secret: 'YOUR_CLIENT_SECRET',  // <<--- MTN Client Secret
    grant_type: 'client_credentials'
  });
  return response.data.access_token;
}

// Replace with the actual Vodafone payment endpoint
async function sendVodafoneCharge(phoneNumber, amount, token, meterNumber) {
  const response = await axios.post('https://api.vodafone.com/payment', {  // <<--- Vodafone Payment Endpoint
    phoneNumber,
    amount,
    meterNumber
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

// Replace with the actual MTN payment endpoint
async function sendMtnCharge(phoneNumber, amount, token, meterNumber) {
  const response = await axios.post('https://api.mtn.com/payment', {  // <<--- MTN Payment Endpoint
    phoneNumber,
    amount,
    meterNumber
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
