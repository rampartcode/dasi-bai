export const useAppModalStore = defineStore("modais", () => {
  const modalImport = ref<boolean>(false);
  const onModalImport = (value: boolean) => (modalImport.value = value);

  const modalSupport = ref<boolean>(false);
  const onModalSupport = (value: boolean) => (modalSupport.value = value);

  const newModalImport = ref<boolean>(false);
  const onNewModalImport = (value: boolean) => (newModalImport.value = value);

  const modalResponse = ref<boolean>(false);
  const onModalResponse = (value: boolean) => (modalResponse.value = value);

  return {
    modalImport,
    onModalImport,
    modalSupport,
    onModalSupport,
    newModalImport,
    onNewModalImport,
    modalResponse,
    onModalResponse,
  };
});
