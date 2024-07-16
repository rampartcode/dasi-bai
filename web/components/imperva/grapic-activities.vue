<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
import type { IResponseImperva } from "@/types/imperva.data";

const data = inject<IResponseImperva>("data");

const options: ApexOptions = {
  chart: {
    id: "actividades",
    foreColor: "rgba(255, 255, 255, 0.65)",
    height: 310,
    type: "area",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: false,
      top: 3,
      left: 14,
      blur: 4,
      opacity: 0.1,
    },
  },
  stroke: {
    width: 5,
    curve: "smooth",
  },
  xaxis: {
    categories: [
      data?.value.top10Ips[0].num_of_events,
      data?.value.top10Ips[1].num_of_events,
      data?.value.top10Ips[2].num_of_events,
      data?.value.top10Ips[3].num_of_events,
      data?.value.top10Ips[4].num_of_events,
      data?.value.top10Ips[5].num_of_events,
      data?.value.top10Ips[6].num_of_events,
      data?.value.top10Ips[7].num_of_events,
      data?.value.top10Ips[8].num_of_events,
      data?.value.top10Ips[9].num_of_events,
    ],
  },
  title: {
    text: "Top 10 IPs mais Bloqueados",
    align: "center",
    style: {
      fontSize: "20px",
      color: "#fff",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      gradientToColors: ["#00a1e0", "#0081b8"],
      shadeIntensity: 1,
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 0.5,
      stops: [0, 100, 100, 100],
    },
  },
  markers: {
    size: 5,
    colors: ["#000"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: {
      size: 7,
    },
  },
  grid: {
    borderColor: "rgba(255, 255, 255, 0.12)",
    show: true,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
    fixed: {
      enabled: true,
    },
    x: {
      show: false,
    },
    y: {
      formatter: function (e) {
        return " " + e + " ";
      },
    },
    marker: {
      show: true,
    },
  },
  colors: ["#00a1e0"],
  yaxis: {
    title: {
      text: "Range ",
    },
  },
};

const series = [
  {
    name: "Total de Eventos",
    data: [
      {
        x: data?.value.top10Ips[0].ip,
        y: data?.value.top10Ips[0].num_of_events,
      },
      {
        x: data?.value.top10Ips[1].ip,
        y: data?.value.top10Ips[1].num_of_events,
      },
      {
        x: data?.value.top10Ips[2].ip,
        y: data?.value.top10Ips[2].num_of_events,
      },
      {
        x: data?.value.top10Ips[3].ip,
        y: data?.value.top10Ips[3].num_of_events,
      },
      {
        x: data?.value.top10Ips[4].ip,
        y: data?.value.top10Ips[4].num_of_events,
      },
      {
        x: data?.value.top10Ips[5].ip,
        y: data?.value.top10Ips[5].num_of_events,
      },
      {
        x: data?.value.top10Ips[6].ip,
        y: data?.value.top10Ips[6].num_of_events,
      },
      {
        x: data?.value.top10Ips[7].ip,
        y: data?.value.top10Ips[7].num_of_events,
      },
      {
        x: data?.value.top10Ips[8].ip,
        y: data?.value.top10Ips[8].num_of_events,
      },
      {
        x: data?.value.top10Ips[9].ip,
        y: data?.value.top10Ips[9].num_of_events,
      },
    ],
  },
];
</script>

<template>
  <div class="card shadow-none bg-transparent">
    <div class="card-body">
      <apexchart
        id="actividades"
        height="400"
        type="area"
        :options="options"
        :series="series"
      >
      </apexchart>
    </div>
  </div>
</template>
