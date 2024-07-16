export const useAppFilter = defineStore("filter", () => {
  const loading = ref(false);
  const onChangeLoadState = (value: boolean) => (loading.value = value);

  return { loading, onChangeLoadState };
});
