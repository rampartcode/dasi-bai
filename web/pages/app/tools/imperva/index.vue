<script setup lang="ts">
import type { IResponseImperva } from "@/types/imperva.data";

const colors = [
  "text-red-500",
  "text-amber-400",
  "text-rose-500",
  "text-red-900",
  "text-orange-500",
  "text-red-500",
];

const { data: DATA } = await useMyFetch<IResponseImperva>("data/imperva", {
  method: "GET",
});

useAppFilter().onChangeLoadState(false);
async function onSubmit(values: { start: Date; end: Date }) {
  useAppFilter().onChangeLoadState(true);
  const { data } = await useMyFetch<IResponseImperva>(
    `data/imperva?start=${values.start}&end=${values.end}`,
    {
      method: "GET",
    }
  );

  useAppFilter().onChangeLoadState(false);
  DATA.value = data.value;
}

provide("data", DATA);
definePageMeta({
  middleware: ["auth-routes"],
});
</script>

<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3">Imperva</div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item">
              <nuxt-link to="/">
                <Icon name="bx:home-alt" size="20" />
              </nuxt-link>
            </li>
            <li class="mx-2">
              <Icon name="bx:chevron-right" size="24" />
            </li>
            <li>
              <Icon name="bx:category" size="20" />
            </li>
            <li class="mx-2">
              <Icon name="bx:chevron-right" size="24" />
            </li>
            <li class="breadcrumb-item active" aria-current="page">Imperva</li>
          </ol>
        </nav>
      </div>
    </div>

    <ui-filter @on:submit="(values) => onSubmit(values)" />

    <hr class="my-3" />

    <h4 class="font-medium mb-2">Eventos Detectados</h4>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3">
      <div v-for="(action, idx) in DATA.attacksTypes" :key="idx" class="col">
        <div class="card bg-[#00a0e08d] radius-10">
          <div class="card-body min-h-24">
            <div class="flex items-center">
              <div class="flex-1">
                <p class="mb-0 text-white">{{ action.name }}</p>
                <h4 class="my-1 text-white">
                  {{ action.value.toLocaleString("de-DE") }}
                </h4>
              </div>
              <div class="widgets-icons bg-white ms-auto">
                <Icon name="bx:info-circle" :class="`${colors[idx]}`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-2 mb-full">
      <div class="col h-full">
        <div class="h-full card radius-10">
          <div class="card-body">
            <ClientOnly>
              <imperva-grafico-one />
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="col h-full">
        <div class="h-full card radius-10">
          <div class="card-body">
            <ClientOnly>
              <imperva-grafico-two />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div class="row row-cols-1">
      <div class="col">
        <div class="card">
          <ClientOnly>
            <imperva-grapic-activities />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
