<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Clerk } from "@clerk/clerk-js";

import TopNav from "./components/TopNav.vue";
import StatCard from "./components/StatCard.vue";
import QuotePanel from "./components/QuotePanel.vue";


const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string;
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

/* Clerk instance */
const clerk = new Clerk(clerkPublishableKey);

/* State */
const clerkReady = ref(false);
const signedIn = ref(false);
const email = ref<string | null>(null);

/* Auth helpers */
async function refreshAuthState() {
  signedIn.value = !!clerk.user;
  email.value = clerk.user?.primaryEmailAddress?.emailAddress ?? null;
}

async function signIn() {
  await clerk.openSignIn();
  await refreshAuthState();
}

async function signUp() {
  await clerk.openSignUp();
  await refreshAuthState();
}

async function signOut() {
  await clerk.signOut();
  await refreshAuthState();
}

/* Init Clerk */
onMounted(async () => {
  await clerk.load();
  await refreshAuthState();
  clerkReady.value = true;
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#06070b] via-[#070A12] to-black text-white">
    <div class="mx-auto max-w-6xl px-6 py-8">

      <!-- Top Navigation -->
      <TopNav active="Stocks" />

      <!-- Header -->
      <div class="mt-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold">Welcome to the real-time Stocks Dashbaord </h1>
          <p class="text-sm text-white/60">
            Tech Stacks :  Vue + NestJS + Clerk + Twelve Data for the Stock market
          </p>
        </div>

        <!-- Auth buttons -->
        <div class="flex items-center gap-3">
          <div v-if="signedIn" class="text-xs text-white/70">
            Signed in as
            <span class="font-semibold text-white">{{ email }}</span>
          </div>

          <template v-if="!clerkReady">
            <div class="text-xs text-white/60">Loading auth...</div>
          </template>

          <template v-else>
            <template v-if="!signedIn">
              <button
                @click="signIn"
                class="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm hover:bg-white/20"
              >
                Sign in
              </button>
              <button
                @click="signUp"
                class="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm hover:bg-white/20"
              >
                Sign up
              </button>
            </template>

            <template v-else>
              <button
                @click="signOut"
                class="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm hover:bg-white/20"
              >
                Sign out
              </button>
            </template>
          </template>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="MLBL" value="12%" sub="Finance" />
        <StatCard title="SFCL" value="11%" sub="Finance" />
        <StatCard title="NTC" value="76%" sub="Insurance" />
        <StatCard title="SHIVAM" value="12%" sub="Finance" />
      </div>

      <!-- Main Content -->
      <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

        <!-- Table -->
        <div class="lg:col-span-2 rounded-2xl bg-white/5 border border-white/10 p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-white/70">Stocks</div>
              <div class="text-xs text-white/50">
                Sample table (static for now)
              </div>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-4 text-xs text-white/50">
            <div>Stock</div>
            <div>Value</div>
            <div>Growth</div>
            <div>Sector</div>
          </div>

          <div class="mt-2 space-y-2 text-sm">
            <div class="grid grid-cols-4 rounded-xl bg-black/30 border border-white/10 p-3">
              <div>HRL</div>
              <div>940</div>
              <div class="text-green-400">10%</div>
              <div>Trading</div>
            </div>
            <div class="grid grid-cols-4 rounded-xl bg-black/30 border border-white/10 p-3">
              <div>JOSH</div>
              <div>769</div>
              <div class="text-red-400">-2%</div>
              <div>Hydro</div>
            </div>
            <div class="grid grid-cols-4 rounded-xl bg-black/30 border border-white/10 p-3">
              <div>NABIL</div>
              <div>710</div>
              <div class="text-green-400">4%</div>
              <div>Banking</div>
            </div>
          </div>
        </div>

        <!-- Quote Panel -->
        <QuotePanel
          :clerk="clerk"
          :apiBaseUrl="apiBaseUrl"
        />
      </div>
    </div>
  </div>
</template>
