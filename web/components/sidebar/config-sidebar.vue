<script lang="ts" setup>
import {
  Server,
  UsersRound,
  UserRoundPlus,
  Database,
  LogOut,
} from "lucide-vue-next";

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
        <li>
          <nuxt-link
            to="/app/settings/ldap"
            exact-active-class="!bg-brand !text-white"
            class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
          >
            <Server size="20" />
            <span class="hidden lg:block"> Configurar LDAP </span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/app/settings/users"
            exact-active-class="!bg-brand !text-white"
            class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
          >
            <UsersRound size="20" />
            <span class="hidden lg:block"> Utilizadores </span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/app/settings/users/create"
            exact-active-class="!bg-brand !text-white"
            class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
          >
            <UserRoundPlus size="20" />
            <span class="hidden lg:block"> Registrar Utilizadores </span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/app/settings/database"
            exact-active-class="!bg-brand !text-white"
            class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
          >
            <Database size="20" />
            <span class="hidden lg:block"> Base de Dados </span>
          </nuxt-link>
        </li>
        <li
          role="button"
          @click="handleExit"
          class="bg-neutral-700 p-2 text-base font-medium flex items-center gap-2 rounded-md cursor-pointer transition-all hover:bg-neutral-600"
        >
          <LogOut size="20" />
          <span class="hidden lg:block"> Terminar sessão </span>
        </li>
      </ul>
    </div>
  </div>
</template>
