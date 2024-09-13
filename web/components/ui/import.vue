<script setup lang="ts">
import { toast } from "vue3-toastify";
import { onClickOutside } from "@vueuse/core";
import { verifyLastUpdateDate } from "@/utils/verifyLastUpdateDate";
import { LoaderCircle } from "lucide-vue-next";

const e = ref("");
const modal = computed(() => useAppModalStore().newModalImport);
const target = ref<HTMLElement | null>(null);

onClickOutside(target, (e) => {
  useAppModalStore().onNewModalImport(false);
});

const loading = ref(false);
const form = ref({
  darktrace: undefined,
  portnox: undefined,
  imperva_waf: undefined,
  imperva_dam: undefined,
  ad_audit: undefined,
  checkpoint_fw_attack: undefined,
  checkpoint_fw: undefined,
  checkpoint_harmony: undefined,
  paloalto: undefined,
});

const formErrors = ref([]);

const onSubmit = async () => {
  const requiredFields = [
    "ad_audit",
    "checkpoint_fw",
    "checkpoint_fw_attack",
    "checkpoint_harmony",
    "darktrace",
    "imperva_dam",
    "imperva_waf",
    "paloalto",
    "portnox",
  ];

  const hasEmptyFields = requiredFields.some((field) => !form.value[field]);

  if (hasEmptyFields) {
    e.value = "Todos os ficheiros são obrigatórios.";
    return;
  }

  e.value = "";
  loading.value = true;

  const forms = document.querySelector("#form");

  const formData = new FormData(forms);

  const { status, error } = await useMyFetch<any>("data", {
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
    v-show="modal"
    class="fixed inset-0 z-50 w-screen h-screen px-4 bg-black/80 backdrop-blur flex items-center justify-center"
  >
    <transition name="fade">
      <div
        ref="target"
        v-show="modal"
        class="bg-neutral-800 max-w-lg w-full p-6 rounded-xl max-h-[90vh] overflow-x-hidden overflow-y-scroll shadow-shape"
      >
        <div class="text-center">
          <h2 class="text-lg font-bold text-white">Importar Dados</h2>
        </div>
        <hr class="my-2" />
        <div>
          <form id="form" @submit.prevent="onSubmit">
            <ui-input-import-data
              name="darktrace"
              label-text="DarkTrace"
              @on:input="(e) => (form.darktrace = e)"
            />
            <ui-input-import-data
              name="ad_audit"
              label-text="AD Audit"
              @on:input="(e) => (form.ad_audit = e)"
            />
            <ui-input-import-data
              name="portnox"
              label-text="PortNox"
              @on:input="(e) => (form.portnox = e)"
            />

            <ui-input-import-data
              name="imperva_waf"
              label-text="Imperva WAF"
              @on:input="(e) => (form.imperva_waf = e)"
            />
            <ui-input-import-data
              name="imperva_dam"
              label-text="Imperva DAM"
              @on:input="(e) => (form.imperva_dam = e)"
            />
            <ui-input-import-data
              name="checkpoint_fw_attack"
              label-text="CheckPoint Firewall Attack"
              @on:input="(e) => (form.checkpoint_fw_attack = e)"
            />
            <ui-input-import-data
              name="checkpoint_fw"
              label-text="CheckPoint Firewall"
              @on:input="(e) => (form.checkpoint_fw = e)"
            />
            <ui-input-import-data
              name="checkpoint_harmony"
              label-text="CheckPoint Harmony"
              @on:input="(e) => (form.checkpoint_harmony = e)"
            />

            <ui-input-import-data
              name="paloalto"
              label-text="Palo Alto"
              @on:input="(e) => (form.paloalto = e)"
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
                class="w-full py-2 bg-[#00a1e0] text-white flex justify-center items-center rounded disabled:opacity-70 hover:bg-[#0081b8] disabled:cursor-not-allowed"
              >
                <LoaderCircle v-show="loading" size="20" class="animate-spin" />
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
