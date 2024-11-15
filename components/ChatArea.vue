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
      <div class="chat-messages" ref="chatMessages">
        <!-- Affiche chaque message dans une bulle -->
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <p>{{ message.text }}</p>
          <span class="timestamp">{{ message.time }}</span>
        </div>
      </div>
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
      messages: [], // Tableau pour stocker les messages
    };
  },
  mounted() {
    // Envoi du message en appuyant sur Enter
    this.$refs.messageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.sendMessage();
      }
    });
  },
  methods: {
    sendMessage() {
      const messageText = this.$refs.messageInput.value.trim(); // Récupère et nettoie le texte du message

      if (messageText) {
        // Ajoute le message dans le tableau de messages
        this.messages.push({
          text: messageText,
          type: "sent", // Style du message
          time: new Date().toLocaleTimeString(),
        });

        // Définit la zone de chat pour défiler vers le bas
        this.$nextTick(() => {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
        });

        // Vide le champ de saisie du message
        this.$refs.messageInput.value = "";
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles.css"></style>
