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

// WhatsApp webhook placeholder
app.post('/whatsapp/webhook', (req, res) => {
  // TODO: Handle WhatsApp messages and AI logic here
  res.sendStatus(200);
});

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