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
      data.value.thrCategory[0].name,
      data.value.thrCategory[1].name,
      data.value.thrCategory[2].name,
      data.value.thrCategory[3].name,
      data.value.thrCategory[4].name,
      data.value.thrCategory[5].name,
      data.value.thrCategory[6].name,
      data.value.thrCategory[7].name,
      data.value.thrCategory[8].name,
      data.value.thrCategory[9].name,
    ],
  },
  title: {
    text: "Categorias de Ameaças",
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
const series = ref([
  {
    name: "Total de Eventos",
    data: [
      {
        x: data.value.thrCategory[2].name,
        y: data.value.thrCategory[2].value,
      },
      {
        x: data.value.thrCategory[3].name,
        y: data.value.thrCategory[3].value,
      },
      {
        x: data.value.thrCategory[4].name,
        y: data.value.thrCategory[4].value,
      },
      {
        x: data.value.thrCategory[0].name,
        y: data.value.thrCategory[0].value,
      },
      {
        x: data.value.thrCategory[5].name,
        y: data.value.thrCategory[5].value,
      },
      {
        x: data.value.thrCategory[6].name,
        y: data.value.thrCategory[6].value,
      },
      {
        x: data.value.thrCategory[7].name,
        y: data.value.thrCategory[7].value,
      },
      {
        x: data.value.thrCategory[8].name,
        y: data.value.thrCategory[8].value,
      },
      {
        x: data.value.thrCategory[1].name,
        y: data.value.thrCategory[1].value,
      },
      {
        x: data.value.thrCategory[9].name,
        y: data.value.thrCategory[9].value,
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
