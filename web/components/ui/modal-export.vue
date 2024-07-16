<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";
import type { ILastUpdate } from "@/types/data";
import { verifyLastUpdateDate } from "@/utils/verifyLastUpdateDate";

const lastUpdate = inject("lastUpdate") as ILastUpdate;

const e = ref("");
const modal = computed(() => useAppModalStore().modalImport);
const target = ref<HTMLElement | null>(null);

onClickOutside(target, () => {
  useAppModalStore().onModalImport(false);
});

const loading = ref(false);
const form = ref({
  report: undefined,
});

const formErrors = ref([]);

const onSubmit = async () => {
  const requiredFields = ["report"];

  const hasEmptyFields = requiredFields.some((field) => !form.value[field]);

  if (hasEmptyFields) {
    e.value = "Todos os ficheiros são obrigatórios.";
    return;
  }

  e.value = "";
  loading.value = true;

  const formData = new FormData(Data);
  const { status, error } = await useMyFetch<any>("data/report", {
    method: "POST",
    contentType: "form-data",
    body: formData,
  });

  loading.value = false;

  if (status.value !== "success") {
    toast.error(error.value?.data.message);
    return;
  }

  toast.success("Dados importados com sucesso!!", {
    onClose: () => {
      reloadNuxtApp();
    },
  });
};

onUnmounted(() => {
  e.value = "";
});
</script>

<template>
  <div
    v-show="false"
    class="bg-black/85 w-full h-screen px-4 fixed inset-0 z-[999] flex items-center justify-center"
  >
    <transition name="fade">
      <div
        v-show="true"
        ref="target"
        class="bg-neutral-800 max-w-lg w-full p-6 rounded-xl max-h-[90vh] overflow-x-hidden overflow-y-scroll"
      >
        <div class="text-center">
          <h2 class="text-lg font-bold text-white">
            Importar Respostas à Incidentes
          </h2>
        </div>
        <hr class="my-2" />
        <div>
          <form id="Data" @submit.prevent="onSubmit">
            <ui-input-import-data
              name="report"
              label-text="Respostas"
              @on:input="(e) => (form.report = e)"
            />
            <hr class="my-3" />
            <div class="my-1 text-center">
              <transition>
                <span v-if="e.length > 0" class="text-red-400 font-normal">
                  {{ e }}
                </span>
              </transition>
            </div>
            <div class="">
              <button
                :disabled="!verifyLastUpdateDate()"
                class="w-full py-2 bg-[#00a1e0] text-white rounded disabled:opacity-70 hover:bg-[#0081b8] disabled:cursor-not-allowed"
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  transform: translate3d(0, 100px, 0);
}

.fade-leave-to {
  transform: translate3d(0, 100px, 0);
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
