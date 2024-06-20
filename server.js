const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/users', async (req, res) => {
  const { nom, prenom } = req.body;
  console.log('Received data:', req.body);
  try {
    const user = await User.create({ nom, prenom });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Ajouter la route GET pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
