<script setup lang="ts">
import type { ApexOptions } from "apexcharts";

const data = inject("data");

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
  title: {
    text: `Eventos Registrados em ${new Date().getFullYear()}`,
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
};

const series = ref([
  {
    name: "Total de Eventos",
    data: [
      {
        x: "Jan",
        y: data.value.annualStatistics[0],
      },
      {
        x: "Fev",
        y: data.value.annualStatistics[1],
      },
      {
        x: "Mar",
        y: data.value.annualStatistics[2],
      },
      {
        x: "Abr",
        y: data.value.annualStatistics[3],
      },
      {
        x: "Mai",
        y: data.value.annualStatistics[4],
      },
      {
        x: "Jun",
        y: data.value.annualStatistics[5],
      },
      {
        x: "Jul",
        y: data.value.annualStatistics[6],
      },
      {
        x: "Ago",
        y: data.value.annualStatistics[7],
      },
      {
        x: "Set",
        y: data.value.annualStatistics[8],
      },
      {
        x: "Out",
        y: data.value.annualStatistics[9],
      },
      {
        x: "Nov",
        y: data.value.annualStatistics[10],
      },
      {
        x: "Dez",
        y: data.value.annualStatistics[11],
      },
    ],
  },
]);
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
