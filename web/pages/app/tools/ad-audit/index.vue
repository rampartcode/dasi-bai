<script setup lang="ts">
import { House, ChevronRight, LayoutDashboard } from "lucide-vue-next";
import type { IAdAuditIndicators } from "@/types/ad-audit.data";

definePageMeta({
  middleware: ["auth-routes"],
});

const colors = ["bg-red-500", "bg-amber-400", "bg-rose-500", "bg-red-900"];

const { data: DATA } = await useMyFetch<IAdAuditIndicators>("data/ad-audit", {
  method: "GET",
});

const loading = ref(false);
async function onSubmit(values: { start: Date; end: Date }) {
  loading.value = true;
  const { data } = await useMyFetch<IAdAuditIndicators>(
    `data/ad-audit?start=${values.start}&end=${values.end}`,
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
              AD Audi Plus
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <ui-filter @on:submit="(values) => onSubmit(values)" :searching="loading" />

    <ad-audit-failure-reasom />

    <hr class="my-4" />

    <div class="row row-cols-1">
      <div class="card">
        <ClientOnly>
          <ad-audit-grapic-activities />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
