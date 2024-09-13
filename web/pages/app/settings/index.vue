<script setup lang="ts">
import { Settings2 } from "lucide-vue-next";

definePageMeta({
  layout: false,
  middleware: ["auth-root"],
});
</script>

<template>
  <div
    class="bg-neutral-900 w-full h-full p-8 flex justify-center items-center space-y-6 rounded-xl shadow-shape overflow-hidden"
  >
    <div class="flex flex-col justify-center items-center gap-3 text-zinc-200">
      <Settings2 size="40" />
      <h4 class="font-medium text-zinc-200">Configure o seu app aqui!</h4>
    </div>
  </div>
</template>
