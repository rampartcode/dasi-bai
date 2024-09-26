interface IRes {
  lastUpdate: string | null;
}

export async function useLastUpdate() {
  const DATA = ref<IRes>({
    lastUpdate: null,
  });

  onMounted(async () => {
    const { data } = await useMyFetch<IRes>("data/last-update", {
      method: "GET",
    });

    DATA.value = data.value;
  });

  return DATA;
}
