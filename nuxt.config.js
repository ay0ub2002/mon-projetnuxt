import connectDB from './server/db';
import registerRoute from './server/register';
import bodyParser from 'body-parser';


import helloRoute from './server/api/yo'; 

export default {
  serverMiddleware: [
    async (req, res, next) => {
      console.log("Tentative de connexion à MongoDB au démarrage...");
      await connectDB();
      console.log("Connexion à MongoDB au démarrage réussie");
      next();
    },
    bodyParser.json(),
    { path: '/api/register', handler: registerRoute },
    { path: '/api/yo', handler: helloRoute }, 
  ],

  // Global page headers
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

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
  ],

  // Modules
  modules: [
    // '@nuxtjs/axios',
    // '@nuxtjs/pwa',
  ],

  // Axios module configuration
  axios: {
    baseURL: '/',
  },

  // PWA module configuration
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration
  build: {},

  server: {
    port: 3001,      
    host: '0.0.0.0', // ouvre ecoute a l'ext
  }





}



