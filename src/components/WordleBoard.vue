<script setup lang="ts">
import { VICTORY_MESSAGE, ERROR_MESSAGE, WORD_SIZE } from '@/settings';
import englishWords from "@/englishWordsWith5Letters.json"
import { computed, ref } from 'vue';

defineProps({ 
  wordOfTheDay: {
  type: String,
  validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})
const guessInProgress = ref("")
const guessSubmitted = ref("")

const formattedGuessInProgress = computed({
  get() {
    return guessInProgress.value;
  },
  set(rawValue: string) {
    guessInProgress.value = rawValue.slice(0, WORD_SIZE);
  }
})

function onSubmit() {
  if (!englishWords.includes(guessInProgress.value)) {
    return;
  }
  guessSubmitted.value = guessInProgress.value
}
</script>

<template>
  <input 
    v-model="formattedGuessInProgress" 
    maxlength="5"
    type="text" 
    @keydown.enter="onSubmit">
  <p v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : ERROR_MESSAGE"/>
</template>