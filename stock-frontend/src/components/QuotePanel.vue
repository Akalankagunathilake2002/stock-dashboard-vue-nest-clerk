<script setup lang="ts">
import { ref } from "vue";
import { Clerk } from "@clerk/clerk-js";

const props = defineProps<{
  clerk: Clerk;
  apiBaseUrl: string;
}>();

const symbol = ref("AAPL");
const loading = ref(false);
const error = ref<string | null>(null);
const quote = ref<any>(null);

async function fetchQuote() {
  error.value = null;
  quote.value = null;

  if (!props.clerk.session) {
    error.value = "Please sign in first.";
    return;
  }

  loading.value = true;
  try {
    const token = await props.clerk.session.getToken({ skipCache: true });

    const res = await fetch(
      `${props.apiBaseUrl}/stocks/quote?symbol=${encodeURIComponent(symbol.value)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error(await res.text());
    quote.value = await res.json();
  } catch (e: any) {
    error.value = e?.message ?? "Something went wrong";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="rounded-2xl bg-white/5 border border-white/10 p-5">
    <div class="flex items-center justify-between">
      <div>
        <div class="text-sm text-white/70">Protected Quote API</div>
        <div class="text-xs text-white/50">NestJS verifies Clerk token → calls Twelve Data</div>
      </div>
    </div>

    <div class="mt-4 flex items-center gap-3">
      <input
        v-model="symbol"
        class="w-40 rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
        placeholder="AAPL"
      />
      <button
        @click="fetchQuote"
        class="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm hover:bg-white/20"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : "Get Quote" }}
      </button>
    </div>

    <div v-if="error" class="mt-3 text-sm text-red-400">{{ error }}</div>

    <div v-if="quote" class="mt-4 grid grid-cols-2 gap-3 text-sm">
      <div class="rounded-xl bg-black/30 border border-white/10 p-3">
        <div class="text-white/60 text-xs">Symbol</div>
        <div class="font-semibold">{{ quote.symbol }}</div>
      </div>
      <div class="rounded-xl bg-black/30 border border-white/10 p-3">
        <div class="text-white/60 text-xs">Price</div>
        <div class="font-semibold">{{ quote.close ?? quote.price ?? "-" }}</div>
      </div>
      <div class="rounded-xl bg-black/30 border border-white/10 p-3">
        <div class="text-white/60 text-xs">Change</div>
        <div class="font-semibold">{{ quote.change ?? "-" }}</div>
      </div>
      <div class="rounded-xl bg-black/30 border border-white/10 p-3">
        <div class="text-white/60 text-xs">% Change</div>
        <div class="font-semibold">{{ quote.percent_change ?? "-" }}</div>
      </div>
    </div>
  </div>
</template>
