<template>
    <div class="register-container">
      <h2>Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" name="email" required placeholder="Entrez votre email" />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" name="password" required placeholder="Entrez votre mot de passe" />
        </div>
        <button type="submit" class="register-button">S'inscrire</button>
      </form>
      <p>Ou connectez-vous avec :</p>
      <div class="social-login">
        <button @click="handleOAuth('google')" class="social-button google">
          <img src="~/assets/resources/google-icon.png" alt="Google" />
        </button>
        <button @click="handleOAuth('microsoft')" class="social-button microsoft">
          <img src="~/assets/resources/microsoft-icon.png" alt="Microsoft" />
        </button>
        <button @click="handleOAuth('github')" class="social-button github">
          <img src="~/assets/resources/github-icon.png" alt="GitHub" />
        </button>
      </div>
      <p>Déjà un compte ? <a href="/login">Connectez-vous ici</a></p>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserRegister",
    methods: {
      handleRegister() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        console.log("Inscription avec :", { email, password });
        // gerer l'inscription par email et mot de passe a envoyer au server 
      },
      handleOAuth(provider) {
        console.log(`Connexion via ${provider}`);
        // redireger vers l'API pour l'authentification OAuth
      },
    },
  };
  </script>
  <style src="@/assets/registerStyle.css"></style>