<script setup>
import { computed } from 'vue';

// Arte do Mentor. `size` é sempre a largura; artes não quadradas usam a proporção abaixo.
const props = defineProps({
  pose: { type: String, required: true },
  size: { type: [Number, String], default: 96 },
  label: { type: String, default: '' },
  eager: Boolean,
});
const proporcoes = { 'logo-robo': 2.2, evolve: 0.8, podcast: 0.8 };
const altura = computed(() => Math.round(Number(props.size) / (proporcoes[props.pose] || 1)));
</script>

<template>
  <img class="persona" :class="`persona--${pose}`" :src="`/img/${pose}.webp`" :alt="label"
    :aria-hidden="label ? undefined : true" :width="Number(size)" :height="altura" :style="{ width: `${size}px` }"
    :loading="eager ? 'eager' : 'lazy'" decoding="async" draggable="false" />
</template>

<style scoped>
.persona { display: inline-block; flex: none; width: auto; height: auto; object-fit: contain; vertical-align: middle; user-select: none; }
</style>
