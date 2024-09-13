<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { Search, LoaderCircle } from "lucide-vue-next";

const emit = defineEmits(["on:submit"]);

const { searching } = withDefaults(
  defineProps<{
    searching: boolean;
  }>(),
  {
    searching: false,
  }
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    start: yup
      .date()
      .max(getDateOneWeekAgo(), "Selecione ao menos a semana anterior")
      .required("Data de inicio é obrigatório*"),
    end: yup
      .date()
      .max(new Date(), "Não é possível usar essa data")
      .required("Data do fim é obrigatório*"),
  }),
});

const onSubmit = handleSubmit((values) => {
  emit("on:submit", values);
});

const [start, startAttrs] = defineField("start");
const [end, endAttrs] = defineField("end");
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="p-4">
        <div class="text-center mb-4">
          <h4>Realizar filtro de dados</h4>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="max-w-2xl mx-auto flex flex-col md:flex-row gap-2">
            <div class="flex-1">
              <label class>Data do inicio</label>
              <input
                type="date"
                v-model="start"
                v-bind="startAttrs"
                class="form-control focus:border-[#00a1e0] focus:shadow-none"
                :class="{ 'border-red-500': errors.start }"
              />
              <div v-show="errors.start" class="block mt-1">
                <p class="text-red-500">{{ errors.start }}</p>
              </div>
            </div>

            <div class="flex-1">
              <label class>Data do fim</label>
              <input
                type="date"
                v-model="end"
                v-bind="endAttrs"
                class="form-control focus:border-[#00a1e0] focus:shadow-none"
                :class="{ 'border-red-500': errors.end }"
                :max="maxDate()"
              />
              <div v-show="errors.end" class="block mt-1">
                <p class="text-red-500">{{ errors.end }}</p>
              </div>
            </div>

            <div class="pt-[21px]">
              <button
                type="submit"
                class="bg-[#00a1e0] text-white w-full md:w-auto rounded-md flex gap-1 items-center py-2 px-3 focus:outline-none"
              >
                <LoaderCircle
                  v-show="searching"
                  size="18"
                  class="animate-spin"
                />
                <Search v-show="!searching" size="18" />
                <span> Filtrar </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
