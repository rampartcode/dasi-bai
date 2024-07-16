<script setup lang="ts">
import type { ApexOptions } from "apexcharts";

const data = inject("data");

const options: ApexOptions = {
  chart: {
    height: 350,
    type: "donut",
    foreColor: "#FAFAFA",
  },
  title: {
    text: "Tratamento das Ameaças",
    align: "center",
    style: {
      fontSize: "20px",
    },
  },
  subtitle: {
    text: "Monitoramentos das actividades",
    align: "center",
    margin: 0,
    style: {
      fontSize: "11px",
    },
  },
  fill: {},
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
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
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            color: "#FFF",
            offsetY: -10,
            formatter: function (val) {
              return val;
            },
          },
          value: {
            show: true,
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            color: undefined,
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },
          total: {
            show: false,
            showAlways: false,
            label: "Total",
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            color: "#373d3f",
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            },
          },
        },
      },
    },
  },
  labels: [
    data.value.actions[0].name,
    data.value.actions[1].name,
    data.value.actions[2].name,
    data.value.actions[3].name,
    data.value.actions[4].name,
  ],
  legend: {
    position: "bottom",
  },
  stroke: {
    colors: undefined,
  },
};

const series = ref([
  data.value.actions[0].value,
  data.value.actions[1].value,
  data.value.actions[2].value,
  data.value.actions[3].value,
  data.value.actions[4].value,
]);
</script>

<template>
  <div>
    <apexchart
      id="graphic-impacts"
      height="350"
      type="donut"
      :options="options"
      :series="series"
    >
    </apexchart>
  </div>
</template>
