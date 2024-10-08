<script setup lang="ts">
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { useForm } from "vee-validate";
import type { LoginResponse } from "@/stores/app.user";
import { Eye, EyeOff, LockOpen, LoaderCircle } from "lucide-vue-next";

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: yup.object({
    username: yup.string().required("O nome de usuário é obrigatório"),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 8 caracteres"),
  }),
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  const { data, status, error } = await useMyFetch<LoginResponse>(
    "auth/login",
    {
      method: "POST",
      contentType: "json",
      body: {
        username: values.username,
        password: values.password,
      },
    }
  );

  if (status.value !== "success") {
    toast.error(error.value?.data.message);
  } else {
    useAppUser().storeUser(data.value.user);
    authCookie.setToken(data.value.token);

    toast.success("Seja bem-vindo de volta!", {
      onClose() {
        if (data.value.user.isConfigure) {
          navigateTo("/app/settings");
          return;
        }

        navigateTo("/app");
      },
    });
  }
});

const hiddenPassword = ref(true);

definePageMeta({
  layout: false,
  middleware: ["auth-login"],
});
</script>

<template>
  <div class="wrapper login h-screen">
    <div class="h-full flex items-center justify-center p-6">
      <div class="card bg-neutral-800 max-w-xl rounded-xl">
        <div class="card-body">
          <div class="border p-4 rounded-xl">
            <div class="text-center mb-2">
              <img src="/logo.svg" width="150" alt="" class="mx-auto mb-4" />

              <h3 class="uppercase">Dasi Solution</h3>
            </div>

            <div class="relative text-center mb-4">
              <button
                class="mx-auto uppercase relative top-3.5 text-white text-xs font-bold p-[5px] bg-black/50 backdrop-blur-lg rounded"
              >
                creedenciais
              </button>
              <hr class="opacity-20" />
            </div>

            <div class="form-body">
              <form @submit.prevent="onSubmit" class="row g-3">
                <div class="col-12">
                  <label for="username" class="form-label">Usuário</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    v-model="username"
                    v-bind="usernameAttrs"
                    placeholder="Nome de usuário"
                  />
                  <span class="text-red-500">{{ errors.username }}</span>
                </div>

                <div class="col-12">
                  <label for="password" class="form-label"> Senha </label>
                  <div class="input-group" id="show_hide_password">
                    <input
                      required
                      :type="`${hiddenPassword ? 'password' : 'text'}`"
                      name="password"
                      class="form-control border-end-0"
                      id="password"
                      v-model="password"
                      v-bind="passwordAttrs"
                      placeholder="Senha"
                    />
                    <a
                      @click="hiddenPassword = !hiddenPassword"
                      class="input-group-text bg-transparent"
                    >
                      <EyeOff v-if="!hiddenPassword" size="20" />
                      <Eye v-if="hiddenPassword" size="20" />
                    </a>
                  </div>
                  <span class="text-red-500">{{ errors.password }}</span>
                </div>

                <div class="col-12">
                  <div class="d-grid">
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="btn btn-light flex justify-center items-center gap-2"
                    >
                      <LoaderCircle
                        v-show="isSubmitting"
                        size="20"
                        class="animate-spin"
                      />

                      <LockOpen v-show="!isSubmitting" class="size-5" />
                      Entrar
                    </button>
                  </div>
                </div>
              </form>
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
