const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const storeRoutes = require('./routes/storeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => res.send('Vyapari AI Backend Running'));

// Store routes
app.use('/stores', storeRoutes);

// WhatsApp webhook verification and message handler
app.get('/whatsapp/webhook', (req, res) => {
  const verify_token = process.env.WHATSAPP_VERIFY_TOKEN || 'vyapari_verify_token'; // use your token here

  // Parse params from the webhook verification request
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if token and mode are present
  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// WhatsApp webhook placeholder
app.post('/whatsapp/webhook', (req, res) => {
  // TODO: Handle WhatsApp messages and AI logic here
  res.sendStatus(200);
});

console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 