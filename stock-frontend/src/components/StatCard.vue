<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  sub?: string;
}>();
</script>

<template>
  <div class="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
    <div class="text-xs text-white/60">{{ title }}</div>
    <div class="mt-2 text-xl font-semibold">{{ value }}</div>
    <div v-if="sub" class="mt-1 text-xs text-white/50">{{ sub }}</div>
    <button class="mt-4 w-full rounded-xl bg-white/5 border border-white/10 py-2 text-sm hover:bg-white/10">
      Watch Market
    </button>
  </div>
</template>
