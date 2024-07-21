<script setup lang="ts">
import { type TabSelected } from "@/types";

const tabSelected = ref<TabSelected>("");
function changeTabSelected(option: TabSelected) {
  tabSelected.value = option;
}

provide("tabSelected", tabSelected);

const handleKeydown = (key: KeyboardEvent) => {
  if (key.key === "Escape") {
    changeTabSelected("");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});

definePageMeta({
  layout: false,
  middleware: ["auth-root"],
});
</script>

<template>
  <div class="wrapper config">
    <ModalResetDataTools />
    <ModalResetDatabase />

    <div class="w-screen h-screen bg-black/90 backdrop-blur overflow-y-scroll lg:overflow-hidden">
      <div class="w-full h-full flex flex-col lg:flex-row gap-6 p-10">
        <SidebarConfigSidebar :changeTabSelected="changeTabSelected" />

        <div class="flex-1">
          <SectionConfigDefault v-if="tabSelected === ''" />
          <SectionConfigServerLdap v-if="tabSelected === 'server-ldap'" />
          <SectionConfigRegisterUser v-if="tabSelected === 'register-user'" />
          <SectionConfigResetDatabase v-if="tabSelected === 'reset-database'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.config {
  background-image: url(/bg-config.jpg);
  @apply h-screen bg-center bg-cover overflow-hidden;
}
</style>
