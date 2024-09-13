<script setup lang="ts">
import { X, Mail, Phone } from "lucide-vue-next";

const modal = computed(() => useAppModalStore().modalSupport);
</script>

<template>
  <div
    v-show="modal"
    class="fixed inset-0 z-50 w-screen h-screen px-4 bg-black/80 backdrop-blur flex justify-center items-center"
  >
    <transition name="fade">
      <div
        v-show="modal"
        class="relative bg-neutral-800 max-w-lg w-full p-6 rounded-lg shadow-shape"
      >
        <div class="flex justify-between items-center">
          <h3>Suporte</h3>
          <button
            @click="useAppModalStore().onModalSupport(false)"
            class="w-8 h-8 border rounded-md leading-none flex items-center justify-center hover:bg-neutral-700"
          >
            <X size="20" />
          </button>
        </div>
        <hr class="my-3" />
        <div>
          <p class="mb-3">
            Abaixo estão listadas as formas de entrar em contacto com o suporte
            técnico:
          </p>
          <ul class="space-y-2">
            <li class="flex items-center gap-3 mb-1">
              <Phone size="20" /> 949 227 949
            </li>
            <li class="flex items-center gap-3">
              <Mail size="20" /> geral@hanzolo.co.ao
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: all 0.4s ease;
}

.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  transform: translate3d(0, 100px, 0);
  opacity: 1;
}

.fade-leave-to {
  transform: translate3d(0, -100px, 0);
  opacity: 0;
}
</style>
