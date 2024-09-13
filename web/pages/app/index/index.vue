<script setup lang="ts">
import { Shield } from "lucide-vue-next";
import type { DATA } from "@/types/data";

const colors = [
  "bg-yellow-400",
  "bg-lime-500",
  "bg-green-500",
  "bg-amber-500",
  "bg-neutral-400",
];

const { data: DATA } = await useMyFetch<DATA>("data", {
  method: "GET",
});

useAppFilter().onChangeLoadState(false);
async function onSubmit(values: { start: Date; end: Date }) {
  useAppFilter().onChangeLoadState(true);
  const { data } = await useMyFetch<DATA>(
    `data?start=${values.start}&end=${values.end}`,
    {
      method: "GET",
    }
  );

  console.log(data.value);

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
    <ui-filter @on:submit="(values) => onSubmit(values)" />

    <div class="card h-full">
      <div class="card-body">
        <div class="p-4 rounded">
          <div class="text-center">
            <h2 class="mb-3">Total de eventos monitorados</h2>
            <span class="text-6xl text-white font-bold">
              {{ DATA.totalEvents?.totalEvents.toLocaleString("de-DE") }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <h4 class="font-normal mb-3">Resposta à Incidentes</h4>
    <div class="text-neutral-900 row row-cols-1 row-cols-md-2 row-cols-xl-5">
      <div
        v-for="(incident, idx) in DATA.incidentResponse"
        :key="idx"
        class="col"
      >
        <div
          class="card min-h-32 radius-10 bg-gradient"
          :class="`${colors[idx]}`"
        >
          <div class="card-body">
            <div class="flex items-center text-neutral-900">
              <div>
                <p class="mb-2 leading-tight text-base h-10">
                  {{ incident.name }}
                </p>
                <h4 class="my-1 text-neutral-900">
                  {{ incident.total }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <div class="row row-cols-1 row-cols-md-2">
      <div class="col flex">
        <div class="card radius-10 w-100">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <h4 class="mb-0 font-weight-bold">
                Eventos detectados por Ferramentas
              </h4>
            </div>
            <hr class="my-4" />
            <div class="table-responsive">
              <table class="table mb-0">
                <tbody>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Ad Audit</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalAdAudit.toLocaleString("de-DE")
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Checkpoint FW</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalCheckFw.toLocaleString("de-DE")
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Checkpoint FW Attack</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalCheckFwAtt.toLocaleString(
                            "de-DE"
                          )
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Checkpoint Harmony</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalCheckHm.toLocaleString("de-DE")
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Darktrace</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalDarktrace.toLocaleString(
                            "de-DE"
                          )
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Imperva DAM</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalImpDam.toLocaleString("de-DE")
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Imperva WAF</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalImpWaf.toLocaleString("de-DE")
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Palo Alto</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalPaloAlto.toLocaleString("de-DE")
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="pl-2 w-[80%]">
                      <div>Portnox</div>
                    </td>
                    <td class="ms-auto pr-2 text-right">
                      <div>
                        {{
                          DATA.totalEvents.totalPortnox.toLocaleString("de-DE")
                        }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col flex">
        <div class="card radius-10 w-100 p-3">
          <ClientOnly>
            <home-graphic-impacts />
          </ClientOnly>
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <div class="row row-cols-1 row-cols-md-3 row-cols-xl-5">
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="flex flex-col justify-center items-center">
              <div class="widgets-icons mb-3">
                <Shield />
              </div>
              <h4 class="my-1">
                {{ DATA.checkpointIndicators.firewall.toLocaleString("de-DE") }}
              </h4>
              <p class="mb-0">Firewall</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="flex flex-col justify-center items-center">
              <div class="widgets-icons mb-3">
                <Shield />
              </div>
              <h4 class="my-1">
                {{
                  DATA.checkpointIndicators.antimalware.toLocaleString("de-DE")
                }}
              </h4>
              <p class="mb-0">Anti-Malware</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="flex flex-col justify-center items-center">
              <div class="widgets-icons mb-3">
                <Shield />
              </div>
              <h4 class="my-1">
                {{
                  DATA.checkpointIndicators.antivirus.toLocaleString("de-DE")
                }}
              </h4>
              <p class="mb-0">Anti-Vírus</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="flex flex-col justify-center items-center">
              <div class="widgets-icons mb-3">
                <Shield />
              </div>
              <h4 class="my-1">
                {{ DATA.checkpointIndicators.antibot.toLocaleString("de-DE") }}
              </h4>
              <p class="mb-0">Anti-BOT</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="flex flex-col justify-center items-center">
              <div class="widgets-icons mb-3">
                <Shield />
              </div>
              <h4 class="my-1">
                {{
                  DATA.checkpointIndicators.ransomware.toLocaleString("de-DE")
                }}
              </h4>
              <p class="mb-0">Ransomware</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <ClientOnly>
      <home-actividades :data="DATA.generalActivity" />
    </ClientOnly>

    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4">
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="b-3">
              <p class="mb-0">Dispositivos em Inconformidades</p>
              <h5 class="mb-0">
                {{
                  DATA.portnoxIndicators.indicators.dvc_nt_comply.toLocaleString(
                    "de-DE"
                  )
                }}
              </h5>
            </div>
            <ClientOnly>
              <home-graphic-dvc-nt-comply
                :data="DATA.portnoxIndicators.monthly.dvc_nt_comply"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="mb-3">
              <p class="mb-0">Dispositivos Inalcançáveis</p>
              <h5 class="mb-0">
                {{
                  DATA.portnoxIndicators.indicators.dvc_unreachable.toLocaleString(
                    "de-DE"
                  )
                }}
              </h5>
            </div>
            <ClientOnly>
              <home-graphic-dvc-nt-comply
                :data="DATA.portnoxIndicators.monthly.dvc_unreachable"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="mb-3">
              <p class="mb-0">Dispositivos não Autorizados</p>
              <h5 class="mb-0">
                {{
                  DATA.portnoxIndicators.indicators.dvc_rogue.toLocaleString(
                    "de-DE"
                  )
                }}
              </h5>
            </div>
            <ClientOnly>
              <home-graphic-dvc-nt-comply
                :data="DATA.portnoxIndicators.monthly.dvc_rogue"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card radius-10">
          <div class="card-body">
            <div class="mb-3">
              <p class="mb-0">Missing IPs</p>
              <h5 class="mb-0">
                {{
                  DATA.portnoxIndicators.indicators.mss_ips.toLocaleString(
                    "de-DE"
                  )
                }}
              </h5>
            </div>
            <ClientOnly>
              <home-graphic-dvc-nt-comply
                :data="DATA.portnoxIndicators.monthly.mss_ips"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
