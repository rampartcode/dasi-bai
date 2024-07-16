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
  xaxis: {
    categories: [
      "Jan",
      "Fev",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  title: {
    text: "Monitoramento das Actividades Anual - " + new Date().getFullYear(),
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
      text: "Eventos ",
    },
  },
};
const series = ref([
  {
    name: "Total de Eventos",
    data: data.value.monthly,
  },
]);

watch(data, (nData) => {
  series.value = [
    {
      name: "Total de Eventos",
      data: nData.monthly,
    },
  ];
});
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
