<script setup lang="ts">
import type { IDarktraceResponse } from "@/types/darktrace.data";

const { data: DATA } = await useMyFetch<IDarktraceResponse>("data/darktrace", {
  method: "GET",
});

useAppFilter().onChangeLoadState(false);
async function onSubmit(values: { start: Date; end: Date }) {
  useAppFilter().onChangeLoadState(true);
  const { data } = await useMyFetch<IDarktraceResponse>(
    `data/darktrace?start=${values.start}&end=${values.end}`,
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
      <div class="breadcrumb-title pe-3">Darktrace</div>
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
            <li class="breadcrumb-item active" aria-current="page">
              Darktrace
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <ui-filter @on:submit="(values) => onSubmit(values)" />

    <hr class="my-3" />

    <div class="row row-cols-1 mb-full">
      <div class="col">
        <div class="card">
          <ClientOnly>
            <darktrace-graphic-activities :data="DATA.annualStatistics" />
          </ClientOnly>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div class="row row-cols-1">
      <div class="col">
        <div class="card">
          <ClientOnly>
            <darktrace-graphic-endpoints :data="DATA.topEndpts" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
