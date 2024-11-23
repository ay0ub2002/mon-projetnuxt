<template>
    <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
          placeholder="Entrez votre email"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
          placeholder="Entrez votre mot de passe"
        />
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
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async handleRegister() {
        const { email, password } = this;
        console.log("Données envoyées :", { email, password }); // debugging
  
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
  
          if (response.ok) {
            alert('Inscription réussie !');
            this.$router.push('/login'); // redirige vers la page de connexion
          } else {
            alert('Erreur lors de l’inscription');
          }
        } catch (err) {
          console.error('Erreur réseau :', err);
          alert('Erreur de connexion.');
        }
      },
      handleOAuth(provider) {
        alert(`Connexion via ${provider} pas encor dispo :(`);
      },
    },
  };
  </script>
  
  <style src="@/assets/registerStyle.css"></style>