const express = require('express');
const router = express.Router();
const User = require('./userModel');
const cors = require('cors');// import de cors


router.use(cors());

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return res.status(201).json({ message: "Inscription réussie !" });
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
    return res.status(500).json({ message: "Erreur interne du serveur." });
  }
});

module.exports = router;
