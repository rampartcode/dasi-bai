<script setup lang="ts">
const sidebarList = useSidebarList();
const sidebarWrapper = ref<HTMLElement | null>(null);

const menuActive = ref("");

const onToggleSidebar = () => {
  if (process.client) {
    const wrapper = document.querySelector(".wrapper");

    if (wrapper?.classList.contains("toggled")) {
      wrapper?.classList.remove("toggled");
    } else {
      wrapper?.classList.add("toggled");
    }
  }
};

const onMouseEnterSidebar = () => {
  const wrapper = document.querySelector(".wrapper");

  if (wrapper?.classList.contains("toggled")) {
    wrapper?.classList.add("sidebar-hovered");
  }
};

const onMouseLeaveSidebar = () => {
  const wrapper = document.querySelector(".wrapper");

  if (wrapper?.classList.contains("toggled")) {
    wrapper?.classList.remove("sidebar-hovered");
  }
};

onMounted(() => {
  const menus = document.querySelectorAll("#nav");
  menus.forEach((menu) => {
    menu.addEventListener("click", (event) => {
      const text = menu.children[1].textContent;

      menuActive.value === text
        ? (menuActive.value = "")
        : (menuActive.value = text);
    });
  });
});

onUnmounted(() => {
  const menus = document.querySelectorAll("#nav");

  menus.forEach((menu) => {
    menu.removeEventListener("click", (event) => {});
  });
});
</script>

<template>
  <div
    ref="sidebarWrapper"
    class="sidebar-wrapper overflow-y-scroll scrollbar"
    data-simplebar="true"
    @mouseenter="onMouseEnterSidebar"
    @mouseleave="onMouseLeaveSidebar"
  >
    <div class="sidebar-header">
      <nuxt-link to="/">
        <img src="/images/logo-bai.svg" class="logo-icon" alt="logo icon" />
      </nuxt-link>
      <nuxt-link to="/">
        <h4 class="logo-text">Banco BAI</h4>
      </nuxt-link>
      <div class="toggle-icon ms-auto" @click="onToggleSidebar">
        <Icon name="bx:bxs-arrow-to-left" />
      </div>
    </div>

    <ul class="metismenu" id="menu">
      <ui-sidebar-item
        v-for="(item, index) in sidebarList"
        :key="index"
        :is-title="item.isTitle"
        :name="item.name"
        :link="item.link"
        :icon="item.icon"
        :sub-items="item.subItems"
        :active="menuActive"
        class=""
      />
      <li
        v-if="canActive(['admin', 'super_analist'])"
        @click="useAppModalStore().onModalResponse(true)"
      >
        <nuxt-link id="nav" class="cursor-pointer">
          <div class="parent-icon">
            <Icon name="bx:cloud-download" />
          </div>
          <div class="menu-title">Adicionar Respostas</div>
        </nuxt-link>
      </li>
      <li @click="useAppModalStore().onModalSupport(true)">
        <nuxt-link id="nav" class="cursor-pointer">
          <div class="parent-icon">
            <Icon name="bx:support" />
          </div>
          <div class="menu-title">Suporte</div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
