const connectDB = require('./server/db');
const registerRoute = require('./server/register');
const bodyParser = require('body-parser');
const messagesRoute = require('./server/messages');
const helloRoute = require('./server/api/yo');

export default {
  serverMiddleware: [
    (req, res, next) => {
      console.log("Tentative de connexion à MongoDB au démarrage...");
      connectDB().then(() => {
        console.log("Connexion à MongoDB au démarrage réussie");
        next();
      }).catch(err => {
        console.error("Erreur connexion MongoDB", err);
        next();
      });
    },
    bodyParser.json(),
    { path: '/api/register', handler: registerRoute },
    { path: '/api/yo', handler: helloRoute },
    { path: '/api/messages', handler: messagesRoute },
  ],

  head: {
    title: 'cat-chat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],
  plugins: [],
  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
  ],

  modules: [],

  axios: {
    baseURL: '/',
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  build: {},

  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  }
};
