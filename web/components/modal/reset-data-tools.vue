<script setup lang="ts">
import { toast } from "vue3-toastify";

const modal = computed(() => useAppModalStore().modalResetDataTools);
function onCloseModal() {
  useAppModalStore().onModalResetDataTools(false);
}

const loading = ref(false);
async function onResetDataTools() {
  loading.value = true;
  const { status } = await useMyFetch("config/reset/data-tools", {
    method: "POST",
  });
  loading.value = false;

  if (status.value !== "success") {
    toast.error("Ocorreu um erro ao resetar os dados de ferramentas.");
    return;
  }

  toast.success("Os dados de ferramentas foram resetados com sucesso.", {
    onClose() {
      onCloseModal();
    },
  });
}
</script>

<template>
  <div
    v-show="modal"
    class="fixed inset-0 z-50 w-screen h-screen px-4 bg-black/50 backdrop-blur flex justify-center items-center"
  >
    <transition name="fade">
      <div
        v-show="modal"
        class="relative bg-neutral-900 max-w-lg w-full p-6 rounded-lg shadow-shape"
      >
        <div class="flex justify-between items-center mb-3">
          <h4>Resetar Dados de Ferramentas</h4>

          <button
            @click="onCloseModal"
            class="w-8 h-8 border rounded-md leading-none hover:bg-neutral-700"
          >
            <Icon name="bx:x" class="size-5" />
          </button>
        </div>

        <div>
          <p>
            Tem certeza de que deseja resetar as informações importadas das
            ferramentas da base de dados? Esta ação é irreversível e todos os
            dados serão perdidos permanentemente!
          </p>
        </div>

        <div class="w-full h-px bg-neutral-700 my-4" />

        <div>
          <div class="flex justify-end gap-4">
            <button
              @click="onCloseModal"
              class="bg-neutral-500 text-neutral-900 font-medium rounded px-4 py-2 transition-all hover:bg-neutral-400 outline-none focus:outline-none"
            >
              Cancelar
            </button>
            <button
              @click="onResetDataTools"
              :disabled="loading"
              :class="loading ? 'opacity-50 cursor-not-allowed' : ''"
              class="bg-red-600 text-white font-medium rounded px-4 py-2 transition-all hover:bg-red-500 outline-none focus:outline-none"
            >
              {{ loading ? "" : "Continuar" }}
              <Icon
                v-show="loading"
                name="svg-spinners:90-ring-with-bg"
                class="size-5"
              />
            </button>
          </div>
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
