<script setup lang="ts">
import { CloudUpload, Menu } from "lucide-vue-next";
import type { ILastUpdate } from "@/types/data";

const lastUpdate = inject("lastUpdate") as ILastUpdate;
const scroll = computed(() => useAppHeaderStore().isScrolledDown);

const searchBar = ref<HTMLElement | null>(null);
const mobileToggleMenu = ref<HTMLElement | null>(null);
const mobileSearchIcon = ref<HTMLElement | null>(null);
const iconCloseSearchFullBar = ref<HTMLElement | null>(null);

onMounted(() => {
  mobileToggleMenu.value?.addEventListener("click", () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper?.classList.add("toggled");
  });

  mobileSearchIcon.value?.addEventListener("click", () => {
    searchBar.value?.classList.add("full-search-bar");
  });

  iconCloseSearchFullBar.value?.addEventListener("click", () => {
    searchBar.value?.classList.remove("full-search-bar");
  });
});

onUnmounted(() => {
  mobileToggleMenu.value?.removeEventListener("click", () => {});
  mobileSearchIcon.value?.removeEventListener("click", () => {});
  iconCloseSearchFullBar.value?.removeEventListener("click", () => {});
});
</script>

<template>
  <header>
    <div class="topbar flex items-center" :class="{ 'bg-dark': scroll }">
      <nav class="w-full px-4 navbar-expand">
        <div class="w-full flex items-center justify-between gap-2 xl:gap-3">
          <div class="flex-1 flex items-center justify-between">
            <div ref="mobileToggleMenu" class="mobile-toggle-menu">
              <Menu />
            </div>

            <div class="hidden lg:block relative search-bar-box">
              <span class="uppercase">
                Última actualização:
                {{
                  typeof lastUpdate.lastUpdate === "string"
                    ? new Date(lastUpdate.lastUpdate).toLocaleString()
                    : "Sem dados cadastrados"
                }}
              </span>
            </div>

            <button
              v-if="canActive(['admin', 'super_analist'])"
              :disabled="!verifyLastUpdateDate(lastUpdate.lastUpdate)"
              @click="useAppModalStore().onNewModalImport(true)"
              class="px-3 py-2.5 rounded-lg bg-[#00a1e0] text-white flex justify-center items-center leading-none gap-2 disabled:bg-red-600/80 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#0081b8]"
            >
              <CloudUpload size="20" />
              <span class="leading-none"> Importar Dados </span>
            </button>
          </div>

          <div class="w-px h-8 bg-gray-400" />

          <ui-avatar />
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
