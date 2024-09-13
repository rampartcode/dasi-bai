<script setup lang="ts">
import {
  House,
  ChevronRight,
  LayoutDashboard,
  Activity,
} from "lucide-vue-next";
import type { IResponsePaloAlto } from "@/types/palo-alto.data";

definePageMeta({
  middleware: ["auth-routes"],
});

const { data: DATA } = await useMyFetch<IResponsePaloAlto>("data/palo-alto", {
  method: "GET",
});

const loading = ref(false);
async function onSubmit(values: { start: Date; end: Date }) {
  loading.value = true;
  const { data } = await useMyFetch<IResponsePaloAlto>(
    `data/palo-alto?start=${values.start}&end=${values.end}`,
    {
      method: "GET",
    }
  );

  loading.value = false;
  DATA.value = data.value;
}

provide("data", DATA);
</script>

<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item">
              <nuxt-link to="/">
                <House size="20" />
              </nuxt-link>
            </li>
            <li class="mx-2">
              <ChevronRight size="24" />
            </li>
            <li>
              <LayoutDashboard size="20" />
            </li>
            <li class="mx-2">
              <ChevronRight size="24" />
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Palo Alto
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <ui-filter @on:submit="(values) => onSubmit(values)" :searching="loading" />

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
        :key="idx"
      >
        <div class="card radius-10" :class="``">
          <div class="card-body">
            <div class="text-white flex items-center">
              <div>
                <div class="mb-2">
                  <Activity class="text-white" size="20" />
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
