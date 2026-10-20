<script setup>
import { computed, nextTick, onUnmounted, ref } from 'vue';
import Ic from './Ic.vue';

const props = defineProps({
  height: { type: Number, default: 520 },
  title: { type: String, default: 'Mentor JML' },
  subtitle: { type: String, default: 'Nova Lei de Licitações · 14.133/21' },
  userInitials: { type: String, default: 'EU' },
});

const answers = {
  'O que muda no pregão com a 14.133?': {
    text: 'O pregão continua para bens e serviços comuns, agora sob a 14.133. O rito concentra os lances antes da habilitação e admite os modos de disputa aberto ou fechado.',
    source: { lesson: 'Aula 10 · Modalidades', timestamp: '08:42' },
  },
  'Como funciona a fase recursal?': {
    text: 'Depois do julgamento e da habilitação, abre-se uma fase recursal única. O curso mostra como a concentração dos recursos reduz etapas intermediárias.',
    source: { lesson: 'Aula 12 · Recursos', timestamp: '14:20' },
  },
  'Explica o diálogo competitivo': {
    refused: true,
    text: 'Você ainda não assistiu à aula sobre diálogo competitivo. Quando chegar nela, eu respondo com a citação exata.',
  },
};

const fallback = 'Não encontrei base nas aulas que você já assistiu para responder isso. Assista à aula correspondente e eu volto com a resposta e o minuto.';
const messages = ref([]);
const input = ref('');
const typing = ref(false);
const body = ref(null);
let responseTimer = null;

const suggestions = computed(() => Object.keys(answers).filter(
  (question) => !messages.value.some((message) => message.text === question),
));

const scrollToEnd = async () => {
  await nextTick();
  if (body.value) body.value.scrollTop = body.value.scrollHeight;
};

const answerQuestion = (question) => {
  const normalized = question.trim();
  if (!normalized || typing.value) return;

  messages.value.push({ type: 'user', text: normalized });
  typing.value = true;
  input.value = '';
  scrollToEnd();

  const match = answers[normalized];
  responseTimer = window.setTimeout(() => {
    typing.value = false;
    messages.value.push({
      type: 'mentor',
      refused: match?.refused ?? !match,
      text: match?.text || fallback,
      source: match?.source || null,
    });
    responseTimer = null;
    scrollToEnd();
  }, 900);
};

const submit = () => answerQuestion(input.value);

onUnmounted(() => {
  if (responseTimer) window.clearTimeout(responseTimer);
});
</script>

<template>
  <section class="mentor-chat" :style="{ height: `${height}px` }" aria-label="Demonstração do chat do Mentor JML">
    <header class="mentor-chat-head">
      <span class="mentor-chat-logo"><Ic name="spark" :size="15" /></span>
      <div><b>{{ title }}</b><small>{{ subtitle }}</small></div>
      <span class="mentor-chat-live"><i></i> AO VIVO</span>
    </header>

    <div ref="body" class="mentor-chat-body" aria-live="polite">
      <div v-if="messages.length === 0" class="mentor-chat-empty">
        <b>Pergunte sobre o que você já estudou</b>
        <p>Eu respondo com base nas aulas assistidas e mostro onde encontrei a informação. Se o assunto ainda não apareceu no curso, eu aviso.</p>
      </div>

      <article
        v-for="(message, index) in messages"
        :key="index"
        class="mentor-message"
        :class="[message.type, { refused: message.refused }]"
      >
        <span class="mentor-message-avatar">
          <span v-if="message.type === 'user'">{{ userInitials }}</span>
          <Ic v-else name="spark" :size="13" />
        </span>
        <div class="mentor-message-bubble">
          <span v-if="message.refused" class="mentor-message-tag"><Ic name="lock" :size="10" /> SEM BASE NAS SUAS AULAS</span>
          {{ message.text }}
          <div v-if="message.source">
            <span class="mentor-message-source">
              <Ic name="play" :size="9" /> {{ message.source.lesson }}
              <span>{{ message.source.timestamp }}</span>
            </span>
          </div>
        </div>
      </article>

      <article v-if="typing" class="mentor-message mentor">
        <span class="mentor-message-avatar"><Ic name="spark" :size="13" /></span>
        <div class="mentor-message-bubble"><span class="mentor-typing"><i></i><i></i><i></i></span></div>
      </article>
    </div>

    <div v-if="suggestions.length" class="mentor-chat-suggestions">
      <button
        v-for="question in suggestions"
        :key="question"
        type="button"
        :class="{ refused: answers[question].refused }"
        :disabled="typing"
        @click="answerQuestion(question)"
      >
        <Ic v-if="answers[question].refused" name="lock" :size="10" />{{ question }}
      </button>
    </div>

    <form class="mentor-chat-input" @submit.prevent="submit">
      <input v-model="input" type="text" placeholder="Digite sua dúvida sobre o conteúdo..." :disabled="typing" aria-label="Dúvida para a demonstração do Mentor" />
      <button type="submit" :disabled="typing || !input.trim()" aria-label="Enviar pergunta"><Ic name="send" :size="15" /></button>
    </form>
  </section>
</template>

<style scoped>
.mentor-chat { display: flex; flex-direction: column; overflow: hidden; color: var(--mn-ink); background: #FFFFFF; border: 1px solid rgba(20, 22, 29, 0.077); border-radius: 16px; }
.mentor-chat-head { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid rgba(20, 22, 29, 0.077); }
.mentor-chat-logo { width: 30px; height: 30px; display: grid; place-items: center; flex: none; color: #fff; background: var(--mentor-grad); border-radius: 9px; }
.mentor-chat-head b { display: block; font-size: var(--fs-sm); font-weight: 800; letter-spacing: -.01em; }
.mentor-chat-head small { display: block; margin-top: 1px; color: #5F636D; font-size: var(--fs-xs); font-weight: 600; }
.mentor-chat-live { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; color: #0A6F5E; font-size: var(--fs-xs); font-weight: 800; letter-spacing: 0; }
.mentor-chat-live i { width: 6px; height: 6px; background: #7FE7B6; border-radius: 50%; box-shadow: 0 0 0 3px rgba(127,231,182,.18); }
.mentor-chat-body { display: flex; flex: 1; min-height: 0; flex-direction: column; gap: 14px; overflow-y: auto; padding: 16px; scrollbar-color: rgba(20, 22, 29, 0.12) transparent; scrollbar-width: thin; }
.mentor-chat-empty { max-width: 290px; margin: auto; padding: 26px 16px; text-align: center; }
.mentor-chat-empty b { font-size: var(--fs-md); font-weight: 800; }
.mentor-chat-empty p { margin: 7px 0 0; color: #5F636D; font-size: var(--fs-sm); line-height: 1.55; }
.mentor-message { display: flex; gap: 10px; max-width: 90%; }
.mentor-message.user { align-self: flex-end; flex-direction: row-reverse; }
.mentor-message-avatar { width: 26px; height: 26px; display: grid; place-items: center; flex: none; border-radius: 8px; font-size: var(--fs-xs); font-weight: 800; }
.mentor-message.mentor .mentor-message-avatar { color: #fff; background: var(--mentor-grad); }
.mentor-message.user .mentor-message-avatar { color: var(--mn-ink-2); background: rgba(20, 22, 29, 0.085); }
.mentor-message-bubble { padding: 11px 14px; border-radius: 13px; font-size: var(--fs-md); line-height: 1.6; }
.mentor-message.mentor .mentor-message-bubble { color: var(--mn-ink); background: rgba(20, 22, 29, 0.043); border: 1px solid rgba(20, 22, 29, 0.077); }
.mentor-message.user .mentor-message-bubble { color: #fff; background: #5B2EBC; border-bottom-right-radius: 4px; font-weight: 600; }
.mentor-message.refused .mentor-message-bubble { color: var(--mn-ink-2); background: rgba(20, 22, 29, 0.026); border: 1px dashed rgba(20, 22, 29, 0.12); }
.mentor-message-tag { display: flex; align-items: center; gap: 6px; width: fit-content; margin-bottom: 8px; padding: 3px 7px; color: #8A5A10; background: rgba(214,150,90,.12); border: 1px solid rgba(214,150,90,.3); border-radius: 6px; font-size: var(--fs-xs); font-weight: 800; letter-spacing: 0; }
.mentor-message-source { display: inline-flex; align-items: center; gap: 7px; margin-top: 10px; padding: 6px 9px; color: #2159B5; background: rgba(62,123,250,.1); border: 1px solid rgba(62,123,250,.3); border-radius: 8px; font-size: var(--fs-sm); font-weight: 700; }
.mentor-message-source span { color: #2159B5; font-family: var(--mentor-mono); font-size: var(--fs-xs); }
.mentor-typing { display: flex; gap: 4px; padding: 3px 0; }
.mentor-typing i { width: 6px; height: 6px; background: #8D5BD8; border-radius: 50%; animation: mentorBlink 1s infinite; }
.mentor-typing i:nth-child(2) { animation-delay: .15s; }
.mentor-typing i:nth-child(3) { animation-delay: .3s; }
.mentor-chat-suggestions { display: flex; flex-wrap: wrap; gap: 7px; padding: 0 16px 12px; }
.mentor-chat-suggestions button { display: inline-flex; align-items: center; gap: 5px; padding: 7px 12px; color: #5B2EBC; background: rgba(109,59,245,.13); border: 1px solid rgba(109,59,245,.32); border-radius: 99px; font-size: var(--fs-sm); font-weight: 600; transition: background .15s, transform .15s; }
.mentor-chat-suggestions button:hover:not(:disabled) { background: rgba(109,59,245,.26); transform: translateY(-1px); }
.mentor-chat-suggestions button.refused { color: #8A5A10; background: rgba(214,150,90,.1); border-color: rgba(214,150,90,.28); }
.mentor-chat-suggestions button:disabled { cursor: default; opacity: .55; }
.mentor-chat-input { display: flex; gap: 9px; padding: 12px 14px; border-top: 1px solid rgba(20, 22, 29, 0.077); }
.mentor-chat-input input { flex: 1; min-width: 0; padding: 11px 13px; color: var(--mn-ink); background: rgba(20, 22, 29, 0.043); border: 1px solid rgba(20, 22, 29, 0.077); border-radius: 10px; outline: none; font: var(--fs-md) var(--mentor-sans); }
.mentor-chat-input input:focus { border-color: #8D5BD8; box-shadow: 0 0 0 3px rgba(109,59,245,.12); }
.mentor-chat-input input::placeholder { color: #565C6D; }
.mentor-chat-input button { width: 40px; height: 40px; display: grid; place-items: center; flex: none; color: #fff; background: var(--mentor-grad); border: 0; border-radius: 10px; }
.mentor-chat-input button:disabled { cursor: default; opacity: .45; }
@keyframes mentorBlink { 0%, 100% { opacity: .25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }
@media (prefers-reduced-motion: reduce) { .mentor-typing i { animation: none; } }
</style>
