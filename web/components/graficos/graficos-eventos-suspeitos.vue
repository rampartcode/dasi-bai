<script setup lang="ts">
import type { ApexOptions } from "apexcharts";

const options: ApexOptions = {
  chart: {
    height: 350,
    type: "donut",
    foreColor: "#FAFAFA",
  },
  title: {
    text: "Eventos suspetios Por Categorias",
    align: "center",
    style: {
      fontSize: "13px",
    },
  },
  subtitle: {
    text: "Bloqueios de Usuarios e Dispositivos",
    align: "center",
    margin: 0,
    style: {
      fontSize: "11px",
    },
  },
  fill: {
    colors: ["#FFF", "#FFFFFFAA", "#FFFFFF70"],
  },
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
  labels: ["Dispositivos", "Região", "Ips"],
  colors: ["#FFF", "#FFFFFFAA", "#FFFFFF70"],
  legend: {
    position: "bottom",
  },
  stroke: {
    colors: undefined,
  }
};

const series = [56, 30, 14];
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
