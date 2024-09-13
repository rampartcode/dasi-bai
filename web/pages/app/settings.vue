<script lang="ts" setup>
definePageMeta({
  layout: false,
  middleware: ["auth-root"],
});
</script>

<template>
  <div class="wrapper config">
    <ModalResetDataTools />
    <ModalResetDatabase />

    <div
      class="w-screen h-screen bg-black/90 backdrop-blur overflow-y-scroll lg:overflow-hidden"
    >
      <div class="w-full h-full flex flex-col lg:flex-row gap-6 p-10">
        <SidebarConfigSidebar />

        <NuxtPage />
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
