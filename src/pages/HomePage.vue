<template>
  <v-container class="chat-container pa-0 d-flex flex-column">
    <!-- Chat Messages -->
    <div class="messages">
      <div v-for="(msg, i) in messages" :key="i">
        <!-- User -->
        <div
          v-if="msg.role === 'user'"
          class="d-flex justify-end align-center px-4 my-2"
        >
          <div class="d-flex align-center">
            <!-- User message -->
            <v-chip color="blue" text-color="white" class="mr-2">
              {{ msg.content }}
            </v-chip>
            <!-- User icon -->
            <v-icon color="blue darken-2">mdi-account</v-icon>
          </div>
        </div>

        <!-- Assistant -->
        <div v-else class="d-flex justify-start align-start px-6 my-2">
          <!-- AI icon -->
          <v-avatar size="32" class="mr-2">
            <v-icon color="green darken-2">mdi-robot</v-icon>
          </v-avatar>

          <!-- AI message -->
          <div
            v-if="msg.role === 'assistant' && msg.content !== '__typing__'"
            class="assistant-msg px-3 py-2 rounded-lg"
            v-html="md.render(msg.content)"
          ></div>

          <!-- Typing loader -->
          <div
            v-else-if="msg.content === '__typing__'"
            class="assistant-msg px-3 py-2 rounded-lg"
          >
            <span class="">Genrating AI Response </span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input (fixed at bottom) -->
    <div class="chat-input border-t d-flex align-center px-2">
      <v-text-field
        v-model="userInput"
        placeholder="Type your message..."
        variant="outlined"
        hide-details
        clearable
        @keyup.enter="sendMessage"
        density="comfortable"
        class="flex-grow"
        style="padding: 5px; height: 90px"
      />

      <!-- Send icon button -->
      <v-btn
        icon
        color="primary"
        @click="sendMessage"
        style="height: 44px; width: 44px; margin-left: 8px"
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, nextTick } from "vue";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

const messages = ref([
  { role: "assistant", content: "Hello 👋 I'm your Travelling AI assistant." },
]);

const userInput = ref("");
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

async function sendMessage() {
  if (!userInput.value.trim()) return;

  // push user message
  messages.value.push({ role: "user", content: userInput.value });
  userInput.value = "";

  // push typing loader
  messages.value.push({ role: "assistant", content: "__typing__" });

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",

        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages.value.filter((m) => m.content !== "__typing__"),
        ],
      }),
    });

    const data = await res.json();
    // remove typing loader
    messages.value = messages.value.filter((m) => m.content !== "__typing__");

    if (data.choices?.length > 0) {
      messages.value.push({
        role: "assistant",
        content: data.choices[0].message.content,
      });
    } else {
      messages.value.push({
        role: "assistant",
        content: "⚠️ No response from AI.",
      });
    }
    nextTick(() => {
      const container = document.querySelector(".messages");
      if (container) container.scrollTop = container.scrollHeight;
    });
  } catch (err) {
    console.error(err);
    messages.value = messages.value.filter((m) => m.content !== "__typing__");
    messages.value.push({
      role: "assistant",
      content: "❌ Error contacting OpenAI API.",
    });
  }
}
</script>

<style>
.chat-container {
  height: 90vh;
}
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.chat-input {
  position: sticky;
  bottom: 10px;
}
.assistant-msg code {
  background: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  margin: 5px;
}
.assistant-msg pre {
  background: #eee;
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
}

/* Typing dots animation */
.dot {
  height: 8px;
  width: 8px;
  margin: 0 2px;
  background-color: #555;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.4s infinite;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.6;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
