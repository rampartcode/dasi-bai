<script lang="ts" setup>
import { Trash } from "lucide-vue-next";

definePageMeta({
  layout: false,
  middleware: ["auth-root"],
});

const loading = ref(true);
const error = ref(false);
const res = ref<Record<string, any>>({
  data: [],
  meta: {},
});

async function fetchUsers(page: number) {
  try {
    const { data } = await useMyFetch<Record<string, any>>(
      `users?page=${page}`,
      {
        method: "GET",
        contentType: "json",
      }
    );

    res.value = data.value;
  } catch (err) {
    error.value = true;
  } finally {
    loading.value = false;
  }
}

async function goToPreviousPage() {
  if (res.value.meta.currentPage > 1) {
    await fetchUsers(res.value.meta.currentPage - 1);
  }
}

async function goToNextPage() {
  if (res.value.meta.currentPage < res.value.meta.lastPage) {
    await fetchUsers(Number(res.value.meta.currentPage) + 1);
  }
}

function updateUserRole(user: any) {
  useAppModalStore().onModalChangeRole({
    visible: true,
    user: {
      id: user.id,
      name: user.name,
      role: user.roles,
    },
  });
}

function handleDeleteUser(user: any) {
  useAppModalStore().onModalDeleteUser({
    visible: true,
    user: {
      id: user.id,
      name: user.name,
    },
  });
}

try {
  await fetchUsers(1);
} finally {
  loading.value = false;
}
</script>

<template>
  <div
    class="bg-neutral-900 w-full h-full p-8 space-y-6 rounded-xl shadow-shape"
  >
    <div class="text-center">
      <h3 class="">Utilizadores</h3>
    </div>

    <div class="bg-neutral-800 w-full h-px" />

    <div class="w-full">
      <template v-if="loading">
        <div class="w-full h-20 rounded-xl bg-neutral-800 animate-pulse" />
      </template>
      <template v-else-if="error">
        <div class="text-red-500 text-center">
          Ocorreu um erro ao carregar os utilizadores.
        </div>
      </template>
      <template v-else>
        <div class="border border-neutral-800 rounded-xl overflow-hidden">
          <table class="w-full divide-y divide-neutral-800">
            <thead>
              <tr class="bg-neutral-800">
                <td
                  class="text-white px-4 py-2 text-left font-medium tracking-wider"
                >
                  Nome
                </td>
                <td
                  class="text-white px-4 py-2 text-left font-medium tracking-wider"
                >
                  Email
                </td>
                <td
                  class="text-white px-4 py-2 text-left font-medium tracking-wider"
                >
                  Nível de acesso
                </td>
                <td
                  class="text-white px-4 py-2 text-left font-medium tracking-wider"
                >
                  Criado
                </td>
                <td
                  class="text-white px-4 py-2 text-left font-medium tracking-wider"
                >
                  Acção
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in res?.data"
                :key="user.id"
                class="transition-all hover:bg-neutral-800/30"
              >
                <td class="whitespace-nowrap px-4 py-2 text-sm">
                  {{ user.name }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-sm">
                  {{ user.email }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-sm">
                  <select
                    class="bg-transparent focus:outline-none"
                    v-model="user.roles"
                    @change="updateUserRole(user)"
                  >
                    <option value="undefined" disabled>
                      Alterar nível de acesso
                    </option>
                    <option value="analist">Analista</option>
                    <option value="super_analist">Supervisor</option>
                    <option value="executive">Executivo</option>
                    <option value="admin">Administrador</option>
                  </select>
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-sm">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-sm">
                  <button
                    @click="handleDeleteUser(user)"
                    class="px-2 py-0.5 hover:text-red-500"
                  >
                    <Trash size="20" />
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5" class="px-4 py-2">
                  <div class="w-full flex items-center justify-between">
                    <div>
                      Página {{ res?.meta.currentPage }} de
                      {{ res?.meta.lastPage }} páginas
                    </div>

                    <div class="flex gap-2">
                      <button
                        @click="goToPreviousPage"
                        :disabled="res?.meta.currentPage === 1"
                        class="bg-zinc-800 border px-3 py-1.5 rounded-md focus:outline-none transition-all hover:bg-opacity-60 hover:border-opacity-40"
                        :class="[
                          res?.meta.currentPage === 1
                            ? 'cursor-not-allowed opacity-50'
                            : '',
                        ]"
                      >
                        Anterior
                      </button>
                      <button
                        @click="goToNextPage"
                        :disabled="res?.meta.currentPage === res?.meta.lastPage"
                        class="bg-zinc-800 border px-3 py-1.5 rounded-md focus:outline-none transition-all hover:bg-opacity-60 hover:border-opacity-40"
                        :class="[
                          res?.meta.currentPage === res?.meta.lastPage
                            ? 'cursor-not-allowed opacity-50'
                            : '',
                        ]"
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </template>
    </div>

    <modal-delete-user />
    <modal-update-user-role />
  </div>
</template>
