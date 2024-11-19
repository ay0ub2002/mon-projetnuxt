<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form id="loginForm" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" name="email" required placeholder="Entrez votre email">
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required placeholder="Entrez votre mot de passe">
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p>Pas encore de compte ? <nuxt-link to="/register">Inscrivez-vous ici</nuxt-link></p> <!--utilisation de nuxt-link-->
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  methods: {
    async handleSubmit() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          // Redirige vers la page de chat si la connexion est réussie
          window.location.href = '/Chat';
        } else {
          alert('Erreur de connexion');
        }
      } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur de connexion');
      }
    }
  }
};
</script>

<style src="@/assets/loginstyles.css"></style>
