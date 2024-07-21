<script setup lang="ts">
import { type TabSelected } from "@/types"
const tabSelected = inject<TabSelected>("tabSelected");
</script>

<template>
  <transition name="scroll-x">
    <div
      v-show="tabSelected === ''"
      class="bg-neutral-900 w-full h-full p-8 space-y-6 rounded-xl shadow-shape"
    >
      <div class="w-full h-full flex flex-col gap-3 items-center justify-center">
        <Icon name="uil:cog" class="size-10" />
        <p class="">Selecione uma opção para configurar.</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.scroll-x-enter-active {
  transition: all 0.5s ease;
}
.scroll-x-leave-active {
  transition: none;
}

.scroll-x-enter-from {
  transform: translateX(50px);
}

/* .scroll-x-leave-to {
  transform: translateX(-60px);
} */

.scroll-x-enter,
.scroll-x-leave {
  opacity: 0;
}
</style>
