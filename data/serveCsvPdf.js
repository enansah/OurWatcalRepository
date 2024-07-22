const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model
const dataSchema = new mongoose.Schema({
  reading_value: String,
  last_reading_time: String,
  last_reading_value: String,
  last_reading_date: String,
  percentage: String,
});

const Data = mongoose.model('Data', dataSchema);

// API endpoint to get data
app.get('/getData', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
