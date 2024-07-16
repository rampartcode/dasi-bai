<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";

const modal = computed(() => useAppModalStore().modalResponse);
const target = ref<HTMLElement | null>(null);

onClickOutside(target, () => {
  useAppModalStore().onModalResponse(false);
});

const loading = ref(false);
const form = ref({
  incidents: <undefined | File>undefined,
});
const formError = ref("");

const validateIncidentData = (file: File): boolean => {
  if (file.type !== "text/csv") {
    formError.value = "Formato de arquivo inválido. Utilize o formato CSV.";
    return false;
  }

  if (file.size > 5000000) {
    formError.value = "Arquivo muito grade. É suporte até 5MB.";
    return false;
  }

  return true;
};

const onSubmit = async () => {
  if (!validateIncidentData(form.value.incidents)) {
    return;
  }

  loading.value = true;

  const formData = new FormData();
  formData.append("incidents", form.value.incidents);

  const success = await sendData(formData);
  if (success) {
    reloadNuxtApp();
  }
};

async function sendData(formData: FormData) {
  const { status, error } = await useMyFetch<any>("data/incidents", {
    method: "POST",
    contentType: "form-data",
    body: formData,
  });

  if (status.value !== "success") {
    toast.error(error.value?.data.message);
    return false;
  }

  toast.success("Dados importados com sucesso!!");
  return true;
}
</script>

<template>
  <div
    v-show="modal"
    class="fixed inset-0 z-50 w-screen h-screen px-4 bg-black/80 backdrop-blur flex items-center justify-center"
  >
    <transition name="fade">
      <div
        v-show="modal"
        ref="target"
        class="bg-neutral-800 max-w-lg w-full p-6 rounded-xl max-h-[90vh] overflow-x-hidden overflow-y-scroll shadow-shape"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold text-white">
            Importar Respostas à Incidentes
          </h2>
          <button
            @click="useAppModalStore().onModalResponse(false)"
            class="w-8 h-8 border rounded-md leading-none hover:bg-neutral-700"
          >
            <Icon name="bx:x" size="20" />
          </button>
        </div>
        <hr class="my-2" />
        <div>
          <form id="Data" @submit.prevent="onSubmit">
            <ui-input-import-data
              name="incidents"
              label-text="Respostas"
              @on:input="(e) => (form.incidents = e)"
            />
            <hr class="my-3" />
            <div class="my-1 text-center">
              <transition>
                <span
                  v-if="formError.length > 0"
                  class="text-red-400 font-normal mb-4"
                >
                  {{ formError }}
                </span>
              </transition>
            </div>
            <div class="">
              <button
                :disabled="!form.incidents || loading"
                class="w-full py-2 bg-[#00a1e0] text-white rounded disabled:opacity-70 hover:bg-[#0081b8] disabled:cursor-not-allowed"
                :class="{ 'opacity-50 cursor-not-allowed': loading }"
              >
                <Icon v-show="loading" name="svg-spinners:ring-resize" />
                <span v-show="!loading"> Concluir importação </span>
              </button>
            </div>
          </form>
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
