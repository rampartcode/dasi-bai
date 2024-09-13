export const useAppModalStore = defineStore("modais", () => {
  const modalImport = ref<boolean>(false);
  const onModalImport = (value: boolean) => (modalImport.value = value);

  const modalSupport = ref<boolean>(false);
  const onModalSupport = (value: boolean) => (modalSupport.value = value);

  const newModalImport = ref<boolean>(false);
  const onNewModalImport = (value: boolean) => (newModalImport.value = value);

  const modalResponse = ref<boolean>(false);
  const onModalResponse = (value: boolean) => (modalResponse.value = value);

  const modalResetDataTools = ref<boolean>(false);
  const onModalResetDataTools = (value: boolean) =>
    (modalResetDataTools.value = value);

  const modalResetDatabase = ref<boolean>(false);
  const onModalResetDatabase = (value: boolean) =>
    (modalResetDatabase.value = value);

  const modalChangeRole = ref<Record<string, any> | undefined>(undefined);
  const onModalChangeRole = (value: Record<string, any> | undefined) =>
    (modalChangeRole.value = value);

  const modalDeleteUser = ref<Record<string, any> | undefined>(undefined);
  const onModalDeleteUser = (value: Record<string, any> | undefined) =>
    (modalDeleteUser.value = value);

  return {
    modalImport,
    onModalImport,
    modalSupport,
    onModalSupport,
    newModalImport,
    onNewModalImport,
    modalResponse,
    onModalResponse,
    modalResetDataTools,
    onModalResetDataTools,
    modalResetDatabase,
    onModalResetDatabase,
    modalChangeRole,
    onModalChangeRole,
    modalDeleteUser,
    onModalDeleteUser,
  };
});
