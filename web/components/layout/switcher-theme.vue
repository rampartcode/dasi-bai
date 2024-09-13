<script setup lang="ts">
import { Settings } from "lucide-vue-next";

const switcherBtn = ref<HTMLElement | null>(null);
const switcherBtnClose = ref<HTMLElement | null>(null);
const switcherWrapper = ref<HTMLElement | null>(null);

const util = Array.from({ length: 13 - 8 + 1 }, (_, i) => i + 8);

const onChangeTheme = (i: number) => {
  document.body.setAttribute("class", `bg-theme bg-theme${i}`);
  useTheme.setTheme(`bg-theme${i}`);
};

onMounted(() => {
  switcherBtn.value?.addEventListener("click", () => {
    switcherWrapper.value?.classList.toggle("switcher-toggled");
  });

  switcherBtnClose.value?.addEventListener("click", () => {
    switcherWrapper.value?.classList.toggle("switcher-toggled");
  });
});

onUnmounted(() => {
  switcherBtn.value?.removeEventListener("click", () => {});
  switcherBtnClose.value?.removeEventListener("click", () => {});
});
</script>

<template>
  <div ref="switcherWrapper" class="switcher-wrapper">
    <div ref="switcherBtn" class="switcher-btn">
      <Settings class="animate-spin-slow" />
    </div>
    <div class="switcher-body">
      <div class="flex items-center">
        <h5 class="mb-0 uppercase">Customizar Tema</h5>
        <button
          ref="switcherBtnClose"
          type="button"
          class="btn-close ms-auto close-switcher"
          aria-label="Close"
        ></button>
      </div>
      <hr class="my-2" />
      <p class="mb-0">Gaussian Texture</p>
      <hr class="my-2" />
      <ul class="switcher">
        <li
          v-for="item in 7"
          :key="item"
          :id="`theme${item}`"
          @click="onChangeTheme(item)"
          class="cursor-pointer"
        />
      </ul>
      <hr class="my-2" />
      <p class="mb-0">Gradient Background</p>
      <hr class="my-2" />
      <ul class="switcher">
        <li
          v-for="item in util"
          :key="item"
          :id="`theme${item}`"
          @click="onChangeTheme(item)"
          class="cursor-pointer"
        />
      </ul>
    </div>
  </div>
</template>
