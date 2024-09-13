<script setup lang="ts">
import { Activity } from 'lucide-vue-next';
import type { IAdAuditIndicators } from "~~/types/ad-audit.data";

const colors = [
  "bg-red-500/90",
  "bg-amber-400/80",
  "bg-rose-500/90",
  "bg-red-900/90",
];

const data = inject<IAdAuditIndicators>("data");
</script>

<template>
  <h4 class="font-medium mb-3">Motivos das Falhas</h4>
  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
    <div class="col" v-for="(failure, idx) in data.failure" :key="failure.name">
      <div class="card" :class="`${colors[idx]}`">
        <div class="card-body">
          <div class="text-white flex items-center">
            <div>
              <div class="mb-2">
                <Activity class="text-white" size="20" />
              </div>
              <p class="mb-1">{{ failure.label }}</p>
              <h3>
                {{ failure.value.toLocaleString("de-DE") }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>