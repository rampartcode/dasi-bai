<script setup lang="ts">
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { useForm } from "vee-validate";
import { LoaderCircle } from "lucide-vue-next";

definePageMeta({
  layout: false,
  middleware: ["auth-root"],
});

const { defineField, handleSubmit, handleReset, errors } = useForm({
  validationSchema: yup.object({
    serverUrl: yup.string().required("URL é obrigatório"),
    adminDn: yup.string().required("adminDn é obrigatório"),
    adminPassword: yup.string().required("adminPassword é obrigatória"),
    userSearchBase: yup.string().required("userSearchBase é obrigatória"),
    usernameAttribute: yup.string().required("usernameAttribute é obrigatório"),
  }),
});

const [serverUrl, serverUrlAttrs] = defineField("serverUrl");
const [adminDn, adminDnAttrs] = defineField("adminDn");
const [adminPassword, adminPasswordAttrs] = defineField("adminPassword");
const [userSearchBase, userSearchBaseAttrs] = defineField("userSearchBase");
const [usernameAttribute, usernameAttributeAttrs] =
  defineField("usernameAttribute");

const loadingConfig = ref(false);
const onSubmit = handleSubmit(async (values) => {
  loadingConfig.value = true;
  const { status, error } = await useMyFetch("config/ldap-server", {
    method: "POST",
    contentType: "json",
    body: {
      serverUrl: values.serverUrl,
      adminDn: values.adminDn,
      adminPassword: values.adminPassword,
      userSearchBase: values.userSearchBase,
      usernameAttribute: values.usernameAttribute,
    },
  });
  loadingConfig.value = false;

  if (status.value === "success") {
    toast.success("Configurações salvas com sucesso!", {
      onClose() {
        handleReset();
      },
    });
  } else {
    toast.error(error.value?.data.message);
  }
});

const loadingTest = ref(false);
const testLdap = handleSubmit(async (payload) => {
  loadingTest.value = true;
  const { status, error } = await useMyFetch("config/ldap-server/test", {
    method: "POST",
    contentType: "json",
    body: payload,
  });
  loadingTest.value = false;

  if (status.value === "success") {
    toast.success("Conexão efectuada com sucesso!");
  } else {
    toast.error(error.value?.data.message);
  }
});

const ldapSettingsIsEmpty = ref(false);
onMounted(async () => {
  const { status } = await useMyFetch("config/ldap-server/status", {
    method: "GET",
  });

  if (status.value !== "success") {
    ldapSettingsIsEmpty.value = true;
  }
});
</script>

<template>
  <div
    class="bg-neutral-900 w-full h-full p-8 space-y-6 rounded-xl shadow-shape overflow-hidden"
  >
    <div class="text-center">
      <h3 class="">Configurar Servidor LDAP</h3>
    </div>

    <div class="bg-neutral-800 w-full h-px" />

    <div class="max-w-lg h-[90%] mx-auto px-1 overflow-y-scroll">
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="serverUrl"
              class="form-label uppercase font-medium text-neutral-600"
            >
              LDAP Server Url
            </label>
            <input
              type="text"
              class="block w-full bg-transparent py-1 outline-none"
              id="serverUrl"
              name="serverUrl"
              v-model="serverUrl"
              v-bind="serverUrlAttrs"
              placeholder="ldap://xxx.xxx.xxx.xxx"
            />
          </div>
          <p v-show="errors.serverUrl" class="px-3 py-1 text-red-600">
            {{ errors.serverUrl }}
          </p>
        </div>

        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="adminDn"
              class="form-label uppercase font-medium text-neutral-600"
            >
              admin Dn
            </label>
            <input
              type="text"
              class="block w-full bg-transparent py-1 outline-none"
              id="adminDn"
              name="adminDn"
              v-model="adminDn"
              v-bind="adminDnAttrs"
              placeholder="CN=user,CN=group,DC=domain,DC=local"
            />
          </div>
          <p v-show="errors.adminDn" class="px-3 py-1 text-red-600">
            {{ errors.adminDn }}
          </p>
        </div>

        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="adminPassword"
              class="form-label uppercase font-medium text-neutral-600"
            >
              Admin Password
            </label>
            <input
              type="password"
              class="block w-full bg-transparent py-1 outline-none"
              id="adminPassword"
              name="adminPassword"
              v-model="adminPassword"
              v-bind="adminPasswordAttrs"
              placeholder="***********"
            />
          </div>
          <p v-show="errors.adminPassword" class="px-3 py-1 text-red-600">
            {{ errors.adminPassword }}
          </p>
        </div>

        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="userSearchBase"
              class="form-label uppercase font-medium text-neutral-600"
            >
              user Search Base
            </label>
            <input
              type="text"
              class="block w-full bg-transparent py-1 outline-none"
              id="userSearchBase"
              name="userSearchBase"
              v-model="userSearchBase"
              v-bind="userSearchBaseAttrs"
              placeholder="DC=domain,DC=local"
            />
          </div>
          <p v-show="errors.userSearchBase" class="px-3 py-1 text-red-600">
            {{ errors.userSearchBase }}
          </p>
        </div>

        <div>
          <div
            class="bg-neutral-950/50 p-3 rounded-lg border !border-neutral-800/60"
          >
            <label
              for="usernameAttribute"
              class="form-label uppercase font-medium text-neutral-600"
            >
              user Attributes
            </label>
            <input
              type="text"
              class="block w-full bg-transparent py-1 outline-none"
              id="usernameAttribute"
              name="usernameAttribute"
              v-model="usernameAttribute"
              v-bind="usernameAttributeAttrs"
              placeholder="[dn,mail,...,cn]"
            />
          </div>
          <p v-show="errors.usernameAttribute" class="px-3 py-1 text-red-600">
            {{ errors.usernameAttribute }}
          </p>
        </div>

        <div class="flex gap-4 justify-center mt-4">
          <button
            type="submit"
            :disabled="loadingConfig"
            class="bg-brand border w-full !border-brand px-5 py-2.5 text-white text-nowrap font-medium rounded-md transition-all hover:bg-brand-hover outline-none focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
          >
            {{ !loadingConfig ? "Cadastrar Informações" : "" }}
            <LoaderCircle
              v-show="loadingConfig"
              size="20"
              class="animate-spin"
            />
          </button>
          <button
            type="button"
            @click="testLdap"
            :disabled="loadingTest"
            class="bg-white/10 w-full border px-5 py-2.5 text-white text-nowrap font-medium rounded-md transition-all hover:bg-white hover:!text-neutral-800 outline-none focus:outline-none disabled:opacity-40 disabled:pointer-events-none"
          >
            <LoaderCircle v-show="loadingTest" size="20" class="animate-spin" />
            {{ !loadingTest ? "Testar Conexão" : "" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
