<script setup lang="ts">
interface IProps {
  data: number[];
}

const { data } = defineProps<IProps>();

const chartOptions = {
  chart: {
    id: "dvc_nt_comply",
    type: "bar",
    height: 100,
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
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
      columnWidth: "60%",
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
  colors: ["#00a1e0"],
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
  tooltip: {
    theme: "dark",
    fixed: {
      enabled: true,
    },
    x: {
      show: true,
    },
    marker: {
      show: true,
    },
  },
};
const series = [
  {
    name: "Total de Eventos",
    data: data,
  },
];
</script>

<template>
  <div class="card shadow-none bg-transparent">
    <div>
      <apexchart
        id="dvc_nt_comply"
        height="100"
        type="bar"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </div>
  </div>
</template>
