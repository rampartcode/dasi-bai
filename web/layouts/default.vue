<script setup lang="ts">
import type { ILastUpdate } from "@/types/data";

const { data: DATA } = await useMyFetch<ILastUpdate>("data/last-update", {
  method: "GET",
});

const modalResponse = computed(() => useAppModalStore().modalResponse);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 6) {
      useAppHeaderStore().onScroll(true);
    } else {
      useAppHeaderStore().onScroll(false);
    }
  });
});

onUnmounted(() => window.removeEventListener("scroll", () => {}));

provide("lastUpdate", DATA);
</script>

<template>
  <div class="wrapper">
    <layout-sidebar />

    <layout-header />

    <div ref="main" class="page-wrapper">
      <slot />

      <layout-switcher-theme />

      <layout-footer />
    </div>
    <ui-modal-support />
    <ui-modal-response />
  </div>
</template>
