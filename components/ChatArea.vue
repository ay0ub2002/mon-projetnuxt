<template>
  <div class="messages-container">
    <!-- Barre de messages à gauche -->
    <div class="sidebar">
      <h2>Messages</h2>
      <ul class="contact-list">
        <li class="contact active">
          <img src="~/assets/resources/pdp.jpeg" alt="Ayoub" class="contact-img">
          <div class="contact-info">
            <p class="contact-name">Ayoub</p>
            <p class="last-message">Bonjour</p>
          </div>
          <span class="message-time">12:00</span>
        </li>
        <li class="add-contact">Ajouter un contact +</li>
      </ul>
    </div>

    <!-- Zone principale de conversation -->
    <div class="chat-area">
      <div class="chat-header">
        <img src="~/assets/resources/pdp.jpeg" alt="Profil" class="profile-img">
        <div class="chat-info">
          <p class="chat-name">Ayoub</p>
          <p class="status">En ligne</p>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-messages" ref="chatMessages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.username === username ? 'sent' : 'received']"
        >
          <p>{{ message.content }}</p>
          <span class="timestamp">{{ message.time }}</span>
        </div>
      </div>

      <!-- Input -->
      <div class="message-input-area">
        <input
          type="text"
          placeholder="Tapez votre message..."
          class="message-input"
          ref="messageInput"
        />
        <button class="send-button" @click="sendMessage">Envoyer</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ChatArea",
  data() {
    return {
      username: localStorage.getItem('username') || 'Anonyme' + Math.floor(Math.random() * 10000),
      newMessage: '',
      messages: [],
      messageInterval: null,
    };
  },

  mounted() {
    // Si pas de username déjà stocké, on le met dans localStorage
    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', this.username);
    }

    this.loadMessages();

    // Refresh automatique des messages toutes les 3 secondes
    this.messageInterval = setInterval(() => {
      this.loadMessages();
    }, 3000);

    // Envoi du message avec la touche Entrée
    this.$refs.messageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.sendMessage();
      }
    });
  },

  beforeDestroy() {
    // Nettoie l'intervalle si le composant est détruit
    clearInterval(this.messageInterval);
  },

  methods: {
    async loadMessages() {
      try {
        const res = await fetch('/api/messages');
        const data = await res.json();

        // Trie les messages par date
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        this.messages = data;
      } catch (err) {
        console.error('Erreur de chargement des messages', err);
      }
    },

    async sendMessage() {
      const messageText = this.$refs.messageInput.value.trim();

      if (messageText) {
        try {
          const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              content: messageText
            }),
          });

          if (response.ok) {
            await this.loadMessages();
            this.$refs.messageInput.value = "";
          } else {
            console.error('Erreur lors de l\'envoi du message');
          }
        } catch (err) {
          console.error('Erreur réseau', err);
        }
      }
    },
  },
};
</script>
