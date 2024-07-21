<script setup lang="ts">
import { toast } from "vue3-toastify";
import { type TabSelected } from "@/types";

const onSubmit = async () => {};

const tabSelected = inject<TabSelected>("tabSelected");
</script>

<template>
  <transition name="scroll-x">
    <div
      v-show="tabSelected === 'reset-database'"
      class="bg-neutral-900 w-full h-full p-8 space-y-6 rounded-xl shadow-shape"
    >
      <div class="text-center">
        <h3 class="">Base de Dados</h3>
      </div>

      <div class="bg-neutral-800 w-full h-px" />

      <div class="max-w-lg mx-auto space-y-4">
        <div>
          <h5 class="mb-2">Resetar Indicadores de Ferramentas</h5>
          <p class="mb-3">
            Essa função lhe permite restaurar todos os indicadores das
            ferramentas de cibersegurança e monitoramento. Ao clicar em
            <strong>'Resetar Indicadores'</strong>, você estará ciente de que
            todos os registros e dados anteriores serão permanentemente
            excluídos, preparando o sistema para uma nova configuração limpa e
            eficiente.
          </p>
          <div class="text-right">
            <button
              @click="useAppModalStore().onModalResetDataTools(true)"
              class="px-4 py-2 text-white/90 font-medium rounded bg-red-600 transition-all hover:bg-red-500 outline-none focus:outline-none"
            >
              Resetar Indicadores
            </button>
          </div>
        </div>

        <div class="bg-neutral-800 w-full h-px" />

        <div>
          <h5 class="mb-2">Resetar Dase de Dados</h5>
          <p class="mb-3">
            Essa função permite restaurar a base de dados do sistema, eliminando
            todos os dados existentes. Ao clicar em 'Resetar Base de Dados',
            você estará ciente de que todos os registros, inclusive os
            utilizadores cadastrados e a configuração da comunicação com o
            servidor LDAP, serão permanentemente removidos, retornando o sistema
            ao seu estado original.
          </p>
          <div class="text-right">
            <button
              @click="useAppModalStore().onModalResetDatabase(true)"
              class="px-4 py-2 text-white/90 font-medium rounded bg-red-600 transition-all hover:bg-red-500 outline-none focus:outline-none"
            >
              Resetar
            </button>
          </div>
        </div>

        <div class="bg-neutral-800 w-full h-px" />
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
