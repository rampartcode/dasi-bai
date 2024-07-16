<script setup lang="ts">
const chartOptions = {
  chart: {
    id: "aplicativos",
    type: "bar",
    height: 65,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: !1,
    },
    dropShadow: {
      enabled: 0,
      top: 3,
      left: 14,
      blur: 4,
      opacity: 0.12,
      color: "#fff",
    },
    sparkline: {
      enabled: !0,
    },
  },
  markers: {
    size: 0,
    colors: ["#fff"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: {
      size: 7,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 4,
      borderRadiusApplication: "top",
      borderRadiusWhenStacked: "last",
      columnWidth: "50%",
      barHeight: "100%",
      colors: {
        backgroundBarColors: [],
        backgroundBarOpacity: 1,
        backgroundBarRadius: 0,
      },
      
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: false,
    width: false,
    curve: "smooth",
  },
  colors: ["#fff"],
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    theme: "dark",
    fixed: {
      enabled: true,
    },
    x: {
      show: true,
    },
    y: {
      title: {
        formatter: function (e) {
          return "";
        },
      },
    },
    marker: {
      show: true,
    },
  },
};
const series = [
  {
    name: "Total Users",
    data: [240, 160, 671, 414, 555, 257, 901, 613, 727, 414, 555, 257],
  },
];
</script>

<template>
  <div class="card shadow-none bg-transparent">
    <div>
      <apexchart id="aplicativos" height="80" type="bar" :options="chartOptions" :series="series">
      </apexchart>
    </div>
  </div>
</template>
