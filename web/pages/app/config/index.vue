<script setup lang="ts">
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { useForm } from "vee-validate";

const { isSubmitting, defineField, handleSubmit, errors } = useForm({
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

const onSubmit = handleSubmit(async (values) => {
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

  if (status.value === "success") {
    toast.success("Configurações salvas com sucesso!", {
      onClose() {
        navigateTo("/auth/login");
      },
    });
  } else {
    toast.error(error.value?.data.message);
  }
});

definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="wrapper login h-screen">
    <div class="h-full flex items-center justify-center">
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          <div class="col mx-auto">
            <div class="card bg-neutral-800 !rounded-xl">
              <div class="card-body">
                <div class="border p-4 rounded-xl">
                  <div class="text-center mb-2">
                    <img
                      src="/logo.svg"
                      width="150"
                      alt=""
                      class="mx-auto mb-4"
                    />

                    <h3 class="uppercase">Dasi Solution</h3>
                  </div>
                  <div class="relative text-center mb-4">
                    <button
                      class="mx-auto uppercase relative top-3.5 text-white text-xs font-bold p-[5px] bg-black/50 backdrop-blur-lg rounded"
                    >
                      Configuração LDAP
                    </button>
                    <hr class="opacity-20" />
                  </div>
                  <form @submit.prevent="onSubmit" class="form-body">
                    <div class="col-12 mb-2">
                      <label for="url" class="form-label"
                        >LDAP Server Url</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="serverUrl"
                        name="serverUrl"
                        v-model="serverUrl"
                        v-bind="serverUrlAttrs"
                        placeholder="ldap://xxx.xxx.xxx.xxx"
                      />
                      <p v-show="errors.serverUrl" class="text-red-600">
                        {{ errors.serverUrl }}
                      </p>
                    </div>
                    <div class="col-12 mb-2">
                      <label for="adminDn" class="form-label">adminDn</label>
                      <input
                        type="text"
                        class="form-control"
                        id="adminDn"
                        name="adminDn"
                        v-model="adminDn"
                        v-bind="adminDnAttrs"
                        placeholder="CN=user,CN=group,DC=domain,DC=local"
                      />
                      <p v-show="errors.adminDn" class="text-red-600">
                        {{ errors.adminDn }}
                      </p>
                    </div>
                    <div class="col-12 mb-2">
                      <label for="adminPassword" class="form-label">
                        adminPassword
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="adminPassword"
                        name="adminPassword"
                        v-model="adminPassword"
                        v-bind="adminPasswordAttrs"
                        placeholder="********"
                      />
                      <p v-show="errors.adminPassword" class="text-red-600">
                        {{ errors.adminPassword }}
                      </p>
                    </div>
                    <div class="col-12 mb-2">
                      <label for="userSearchBase" class="form-label">
                        userSearchBase
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="userSearchBase"
                        name="userSearchBase"
                        v-model="userSearchBase"
                        v-bind="userSearchBaseAttrs"
                        placeholder="DC=domain,DC=local"
                      />
                      <p v-show="errors.userSearchBase" class="text-red-600">
                        {{ errors.userSearchBase }}
                      </p>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="usernameAttribute" class="form-label">
                        usernameAttribute
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="usernameAttribute"
                        name="usernameAttribute"
                        v-model="usernameAttribute"
                        v-bind="usernameAttributeAttrs"
                        placeholder="sAMAccountName"
                      />
                      <p v-show="errors.usernameAttribute" class="text-red-600">
                        {{ errors.usernameAttribute }}
                      </p>
                    </div>
                    <div class="col-12 text-center">
                      <button type="submit" class="btn btn-light">
                        Cadastrar Informações do LDAP
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-image: url(/images/login-images/bg-login.jpg);
  @apply bg-center bg-cover;
}
</style>
