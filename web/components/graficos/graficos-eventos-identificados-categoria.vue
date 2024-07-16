<script setup lang="ts">
import type { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    foreColor: "#FAFAFA",
    toolbar: {
      show: false,
    },
  },
  grid: {
    borderColor: "#FAFAFA00",
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "70%",
      rangeBarOverlap: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#FFFFFF70", "#FFFFFFAA", "#FFF"],
  stroke: {
    width: 0,
  },
  title: {
    text: "Eventos identificados por Categoria",
    align: "center",
  },
  xaxis: {
    categories: [
      "Malware",
      "Phishing",
      "Negação de Serviço",
      "Injeção de Código",
      "Engenharia reversa",
    ],
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: function (val) {
        return val + "";
      },
    },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
  },
};

const series = [
  {
    name: "XX",
    data: [3, 4, 4, 2, 5],
  },
  {
    name: "AA",
    data: [2, 2, 3, 2, 1],
  },
  {
    name: "ZZ",
    data: [5, 3, 4, 7, 2],
  },
];
</script>

<template>
  <div class="card shadow-none bg-transparent">
    <div>
      <apexchart
        id="indentificados-categoria"
        type="bar"
        height="300"
        :options="options"
        :series="series"
      >
      </apexchart>
    </div>
  </div>
</template>
