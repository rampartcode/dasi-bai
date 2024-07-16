<script setup lang="ts">
import type { IResponsePaloAlto } from "@/types/palo-alto.data";

const { data: DATA } = await useMyFetch<IResponsePaloAlto>("data/palo-alto", {
  method: "GET",
});

useAppFilter().onChangeLoadState(false);
async function onSubmit(values: { start: Date; end: Date }) {
  useAppFilter().onChangeLoadState(true);
  const { data } = await useMyFetch<IResponsePaloAlto>(
    `data/palo-alto?start=${values.start}&end=${values.end}`,
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
      <div class="breadcrumb-title pe-3">Palo Alto</div>
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
              AD Audi Plus
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <ui-filter @on:submit="(values) => onSubmit(values)" />

    <hr class="my-4" />

    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <ClientOnly>
              <paloalto-graphic-severity />
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <ClientOnly>
              <paloalto-graphic-actions />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <h4 class="font-medium mb-3">Tipo de Ameaça</h4>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
      <div
        class="col"
        v-for="(content, idx) in DATA.th_content_name"
        :key="content.name"
      >
        <div class="card radius-10" :class="``">
          <div class="card-body">
            <div class="text-white flex items-center">
              <div>
                <div class="mb-2">
                  <Icon name="bx:pulse" class="text-white" size="20" />
                </div>
                <p class="mb-1">{{ content.name }}</p>
                <h3>
                  {{ content.value.toLocaleString("de-DE") }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <div class="row row-cols-1">
      <div class="card">
        <ClientOnly>
          <paloalto-graphic-th-content-name :data="DATA.thrCategory" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
