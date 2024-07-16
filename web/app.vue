<script setup lang="ts">
onMounted(() => {
  const theme = useTheme.getTheme() ?? 'bg-theme2';
  
  document.body.setAttribute("class", `bg-theme ${theme}`);
});
</script>

<template>
  <NuxtLoadingIndicator color="#00a1e0" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ui-import />
</template>
