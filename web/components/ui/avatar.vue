<script setup lang="ts">
import { CircleUserRound, Settings, LogOut } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";

const { user, logout } = useAppUser();

const isOpen = ref(false);
const modal = ref<HTMLElement | null>(null);

onClickOutside(modal, () => {
  isOpen.value = false;
});

async function handleLogoutSession() {
  await authCookie.deleteToken();
  await useAppUser().storeUser(null);
  reloadNuxtApp();
}

const onOpenModalAvatar = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="relative">
    <button
      @click="onOpenModalAvatar"
      class="w-[40px] h-[40px] xl:w-48 flex items-center justify-center gap-3 focus:outline-none"
    >
      <img
        src="../../assets/img/avatar.png"
        class="w-full h-full xl:w-9 xl:h-9 rounded-full cursor-pointer"
        alt="Foto do perfil"
      />
      <div class="hidden flex-1 xl:block text-left space-y-1 truncate">
        <p class="block text-white font-semibold leading-none truncate">
          {{ user.name }}
        </p>
        <span class="block text-white/70 leading-none truncate">
          {{ getUserRole(user?.roles) }}
        </span>
      </div>
    </button>
    <transition name="fade">
      <div
        ref="modal"
        v-show="isOpen"
        class="absolute z-[999999999] w-40 right-0 xl:left-0 top-14 bg-[#1e1e1e] rounded py-2 topp"
      >
        <ul class="flex flex-col text-white/90 p-0">
          <nuxt-link
            to="#"
            class="text-sm px-4 py-1 flex items-center gap-2 hover:bg-white/15"
          >
            <CircleUserRound size="18" color="#FFFFFFE6" />
            Profile
          </nuxt-link>
          <nuxt-link
            to="#"
            class="text-sm px-4 py-1 flex items-center gap-2 hover:bg-white/15"
          >
            <Settings size="18" color="#FFFFFFE6" />
            Settings
          </nuxt-link>
          <nuxt-link
            @click="handleLogoutSession"
            class="cursor-pointer text-sm px-4 py-1 flex items-center gap-2 hover:bg-white/15 border-t border-white/15"
          >
            <LogOut size="18" color="#FFFFFFE6" />
            Logout
          </nuxt-link>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.topp::before {
  content: "";
  width: 13px;
  height: 13px;
  background: #1e1e1e;
  position: absolute;
  top: -6px;
  right: 16px;
  transform: rotate(45deg);
  border-top: 1px solid #767676;
  border-left: 1px solid #767676;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  transform: translate3d(0, 50px, 0);
}

.fade-leave-to {
  transform: translate3d(0, 50px, 0);
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
