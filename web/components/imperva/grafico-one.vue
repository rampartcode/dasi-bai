<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
import type { IResponseImperva } from "@/types/imperva.data";

const data = inject<IResponseImperva>("data");

const options: ApexOptions = {
  chart: {
    height: 350,
    type: "donut",
    foreColor: "#FAFAFA",
  },
  title: {
    text: "Tratamento dos Eventos",
    align: "center",
    style: {
      fontSize: "20px",
    },
  },
  subtitle: {
    text: "Tratamento dos eventos detectados",
    align: "center",
    style: {
      fontSize: "14px",
    },
  },
  fill: {
    colors: ["#FFF", "#FFFFFFAA"],
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return (
        '<div class="bg-neutral-600 p-2">' +
        "<span>" +
        w.globals.labels[seriesIndex] +
        ": " +
        series[seriesIndex].toLocaleString("de-DE") +
        "</span>" +
        "</div>"
      );
    },
  },
  plotOptions: {
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: true,
      offsetX: 0,
      offsetY: 47,
      customScale: 1,
      dataLabels: {
        offset: 0,
        minAngleToShowLabel: 10,
      },
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  labels: ["Nenhum", "Bloqueados"],
  colors: ["#FFF", "#FFFFFFAA"],
  legend: {
    position: "bottom",
  },
  stroke: {
    show: false,
  },
};

const series = ref([data?.value.action.none, data?.value.action.block]);
</script>

<template>
  <div class="card shadow-none bg-transparent">
    <div>
      <apexchart
        id="eventos-suspeitos"
        height="350"
        type="donut"
        :options="options"
        :series="series"
      >
      </apexchart>
    </div>
  </div>
</template>
