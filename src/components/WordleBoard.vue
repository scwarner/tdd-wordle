<script setup lang="ts">
import { VICTORY_MESSAGE, ERROR_MESSAGE } from '@/settings';

defineProps<{
  wordOfTheDay: string
}>()
</script>

<template>
  <input type="text">
  <p>{{ VICTORY_MESSAGE }}</p>
  <input type="text">
  <p>{{ ERROR_MESSAGE }}</p>
</template>