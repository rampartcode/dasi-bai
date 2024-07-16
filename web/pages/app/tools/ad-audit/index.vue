<script setup lang="ts">
import type { IAdAuditIndicators } from "@/types/ad-audit.data";

const colors = ["bg-red-500", "bg-amber-400", "bg-rose-500", "bg-red-900"];

const { data: DATA } = await useMyFetch<IAdAuditIndicators>("data/ad-audit", {
  method: "GET",
});

useAppFilter().onChangeLoadState(false);
async function onSubmit(values: { start: Date; end: Date }) {
  useAppFilter().onChangeLoadState(true);
  const { data } = await useMyFetch<IAdAuditIndicators>(
    `data/ad-audit?start=${values.start}&end=${values.end}`,
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
      <div class="breadcrumb-title pe-3">AD Audit</div>
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
