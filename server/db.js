const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("Fonction connectDB appelée"); // Debugging
    try {
        console.log("tentative de connexion a mangodb...");// Debugging

        await mongoose.connect('mongodb+srv://ayouplock:gloupoi2001@cluster0.vjamf.mongodb.net/messagerie?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log('Connexion réussie à MongoDB');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;