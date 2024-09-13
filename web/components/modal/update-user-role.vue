<script setup lang="ts">
import { toast } from "vue3-toastify";
import { X, LoaderCircle } from "lucide-vue-next";

const modal = computed(() => useAppModalStore().modalChangeRole);

function handleClose() {
  useAppModalStore().onModalChangeRole(undefined);
  reloadNuxtApp();
}

const loading = ref(false);
async function changeUserRole() {
  loading.value = true;

  const { status } = await useMyFetch("users/change-role", {
    method: "PATCH",
    contentType: "json",
    body: {
      userId: modal.value?.user.id,
      role: modal.value?.user.role,
    },
  });

  loading.value = false;

  if (status.value !== "success") {
    toast.error("Ocorreu um erro ao atualizar o nível de acesso.");
    return;
  }

  toast.success("Nível de acesso atualizado com sucesso.", {
    onClose: () => {
      reloadNuxtApp();
    },
  });
}
</script>

<template>
  <div
    v-show="modal?.visible"
    class="fixed inset-0 z-50 w-screen h-screen px-4 bg-black/80 backdrop-blur flex justify-center items-center"
  >
    <transition name="fade">
      <div
        v-show="modal?.visible"
        class="relative bg-neutral-800 max-w-lg w-full p-6 rounded-lg shadow-shape"
      >
        <div class="flex justify-between items-center">
          <h4 class="font-medium">Alterar nível de acesso</h4>
          <button
            @click="handleClose"
            :disabled="loading"
            class="w-8 h-8 border rounded-md leading-none flex items-center justify-center hover:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            <X size="20" />
          </button>
        </div>
        <hr class="my-3" />
        <div>
          <p class="mb-3">
            Tem a certeza que deseja tornar o
            <span class="font-semibold">{{ modal?.user.name }}</span> num
            utilizador
            <span class="font-semibold">
              {{ getUserRole(modal?.user.role) }} </span
            >?
          </p>
        </div>
        <div class="flex gap-3 justify-end items-center">
          <button
            @click="handleClose"
            :disabled="loading"
            class="px-3 py-2 rounded-md text-white font-medium bg-neutral-500/80 transition-all hover:bg-neutral-600 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            Cancelar
          </button>
          <button
            @click="changeUserRole"
            :disabled="loading"
            class="px-3 py-2 rounded-md text-white flex items-center justify-center gap-2 font-medium bg-[#00a1e0] transition-all hover:bg-[#0081b8] focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            <LoaderCircle v-if="loading" size="20" class="animate-spin" />
            Sim, continuar
          </button>
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
