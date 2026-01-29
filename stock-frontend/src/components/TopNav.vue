<script setup lang="ts">
defineProps<{ active: string }>();
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="h-9 w-9 rounded-xl bg-white/10 grid place-items-center">
        <span class="text-lg font-bold">S</span>
      </div>
      <div class="flex gap-6 text-sm text-white/70">
        <button class="hover:text-white" :class="active === 'News' ? 'text-white' : ''">News</button>
        <button class="hover:text-white" :class="active === 'Stocks' ? 'text-white' : ''">Stocks</button>
        <button class="hover:text-white" :class="active === 'Charts' ? 'text-white' : ''">Neps Chart</button>
        <button class="hover:text-white" :class="active === 'Market' ? 'text-white' : ''">Market Zone</button>
      </div>
    </div>

    <div class="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
      Stocks
    </div>
  </div>
</template>
