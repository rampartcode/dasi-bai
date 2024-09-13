<script lang="ts" setup>
import { House, Undo2 } from "lucide-vue-next";
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

function handleClearError() {
  clearError({ redirect: "/app" });
}
</script>

<template>
  <div class="wrapper config">
    <section class="w-full h-full flex justify-center items-center bg-black/70">
      <div
        class="space-y-5 max-w-screen-xl p-8 bg-zinc-900 rounded-xl border border-zinc-400"
      >
        <h1 class="text-5xl text-white font-bold">404</h1>

        <div class="space-y-2">
          <p class="text-2xl text-white font-bold">Página não encontrada!</p>

          <p class="mb-4">
            O endereço
            <span class="font-semibold underline">{{ props.error.url }}</span>
            não está disponível na Dashboard.
          </p>

          <button
            @click="handleClearError"
            class="px-3 py-2.5 rounded-lg bg-[#00a1e0] text-white flex justify-center items-center leading-none gap-2 disabled:bg-red-600/80 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#0081b8]"
          >
            <Undo2 size="20" /> Ir para página inicial
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.config {
  background-image: url(/bg-config.jpg);
  @apply h-screen bg-center bg-cover overflow-hidden;
}
</style>
