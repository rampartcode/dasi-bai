<script setup lang="ts">
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { useForm } from "vee-validate";
import { TriangleAlert, LoaderCircleIcon } from "lucide-vue-next";

definePageMeta({
  layout: false,
  middleware: ["auth-root"],
});

const { isSubmitting, defineField, handleSubmit, errors, handleReset } =
  useForm({
    validationSchema: yup.object({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().required("Email é obrigatório"),
      username: yup.string().required("Username é obrigatória"),
      roles: yup.string().required("Função é obrigatória"),
    }),
  });

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [username, usernameAttrs] = defineField("username");
const [roles, rolesAttrs] = defineField("roles");

const onSubmit = handleSubmit(async (values) => {
  const { status, error } = await useMyFetch("users", {
    method: "POST",
    contentType: "json",
    body: {
      name: values.name,
      email: values.email,
      username: values.username,
      roles: values.roles,
    },
  });

  if (status.value === "success") {
    toast.success("Usuário registrado na plaforma!", {
      onClose() {
        navigateTo("/app/settings/users");
      },
    });
  } else {
    toast.error(error.value?.data.message);
  }
});

const ldapSettingsIsEmpty = ref(false);
const { status } = await useMyFetch("config/ldap-server/status", {
  method: "GET",
});
if (status.value !== "success") {
  ldapSettingsIsEmpty.value = true;
}
</script>

<template>
  <div
    class="bg-neutral-900 w-full h-full p-8 space-y-6 rounded-xl shadow-shape"
  >
    <div class="text-center">
      <h3 class="">Adicionar Utilizador</h3>
    </div>

    <div class="bg-neutral-800 w-full h-px" />

    <div class="max-w-lg mx-auto space-y-3">
      <div
        v-show="ldapSettingsIsEmpty"
        class="bg-red-600/80 text-zinc-200 p-2 flex gap-2 items-center rounded"
      >
        <TriangleAlert size="20" />
        A configuração do servidor LDAP não foi concluida!
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="name"
              class="form-label uppercase font-medium text-neutral-600"
            >
              Nome Completo
            </label>
            <input
              type="text"
              class="block w-full bg-transparent py-1 outline-none"
              id="name"
              name="name"
              v-model="name"
              v-bind="nameAttrs"
              placeholder="Firstname Lastname"
            />
          </div>
          <p v-show="errors.name" class="px-3 py-1 text-red-600">
            {{ errors.name }}
          </p>
        </div>

        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="email"
              class="form-label uppercase font-medium text-neutral-600"
            >
              Email
            </label>
            <input
              type="text"
              class="block w-full bg-transparent py-1 outline-none"
              id="email"
              name="email"
              v-model="email"
              v-bind="emailAttrs"
              placeholder="example@bancobai.ao"
            />
          </div>
          <p v-show="errors.email" class="px-3 py-1 text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="username"
              class="form-label uppercase font-medium text-neutral-600"
            >
              Username
            </label>
            <input
              type="text"
              class="block w-full bg-transparent py-1 outline-none"
              id="username"
              name="username"
              v-model="username"
              v-bind="usernameAttrs"
              placeholder="Example"
            />
          </div>
          <p v-show="errors.username" class="px-3 py-1 text-red-600">
            {{ errors.username }}
          </p>
        </div>

        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="roles"
              class="form-label uppercase font-medium text-neutral-600"
            >
              Função
            </label>

            <select
              name="roles"
              id="roles"
              v-model="roles"
              v-bind="rolesAttrs"
              class="block w-full bg-transparent py-1 outline-none"
            >
              <option
                selected
                disabled
                value="undefined"
                class="bg-neutral-900 before:p-1"
              >
                Selecione a função
              </option>
              <option value="analist" class="bg-neutral-900 before:p-1">
                Analista
              </option>
              <option value="super_analist" class="bg-neutral-900 before:p-1">
                Supervisor
              </option>
              <option value="executive" class="bg-neutral-900 before:p-1">
                Executivo
              </option>
              <option value="admin" class="bg-neutral-900 before:p-1">
                Administrador
              </option>
            </select>
          </div>

          <p v-show="errors.usernameAttribute" class="px-3 py-1 text-red-600">
            {{ errors.usernameAttribute }}
          </p>
        </div>

        <div class="flex gap-4 justify-center mt-4">
          <button
            type="submit"
            :disabled="isSubmitting || ldapSettingsIsEmpty"
            class="bg-brand border !border-brand w-full px-5 py-2.5 flex justify-center font-medium rounded-md transition-all hover:bg-brand-hover outline-none focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
          >
            {{ !isSubmitting ? "Cadastrar Informações" : "" }}

            <LoaderCircleIcon
              v-if="isSubmitting"
              size="20"
              class="animate-spin"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
