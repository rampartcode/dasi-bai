<script lang="ts" setup>
import { type TabSelected } from "@/types";

const tabSelected = inject<TabSelected>("tabSelected");

const { changeTabSelected } = defineProps<{
  changeTabSelected: (tab: string) => void;
}>();

function handleExit() {
  authCookie.deleteToken();
  useAppUser().logout();

  return navigateTo("/auth/login");
}
</script>

<template>
  <div
    class="bg-neutral-800 h-16 lg:w-80 lg:h-full z-10 flex items-center gap-4 lg:block p-6 lg:space-y-6 rounded-xl shadow-shape"
  >
    <div>
      <img src="/logo.svg" width="100" class="mx-auto" />
    </div>

    <div class="bg-neutral-700 w-px h-10 lg:w-full lg:h-px" />

    <div>
      <ul class="flex gap-2 lg:block lg:space-y-3">
        <li
          @click="changeTabSelected('server-ldap')"
          :class="{
            '!bg-brand !text-white': tabSelected === 'server-ldap',
          }"
          class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
          role="button"
          aria-selected="tabSelected === 'server-ldap'"
        >
          <Icon name="uil:server" class="size-6 lg:size-5" />
          <span class="hidden lg:block"> Configurar LDAP </span>
        </li>
        <li
          @click="changeTabSelected('register-user')"
          :class="{ '!bg-brand !text-white': tabSelected === 'register-user' }"
          class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
          role="button"
          aria-selected="tabSelected === 'register-user'"
        >
          <Icon name="uil:user" class="size-6 lg:size-5" />
          <span class="hidden lg:block"> Registrar Utilizadores </span>
        </li>
        <li
          @click="changeTabSelected('reset-database')"
          :class="{ '!bg-brand !text-white': tabSelected === 'reset-database' }"
          class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
          role="button"
          aria-selected="tabSelected === 'reset-database'"
        >
          <Icon name="uil:database" class="size-6 lg:size-5" />
          <span class="hidden lg:block"> Base de Dados </span>
        </li>
        <li
          role="button"
          @click="handleExit"
          class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
        >
          <Icon name="uil:exit" class="size-6 lg:size-5" />
          <span class="hidden lg:block"> Terminar sessão </span>
        </li>
      </ul>
    </div>
  </div>
</template>
