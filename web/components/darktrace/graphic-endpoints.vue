<script setup lang="ts">
const data = inject("data");

const chartOptions = {
  chart: {
    id: "por-categoria",
    foreColor: "rgba(255, 255, 255, 0.65)",
    type: "bar",
    styledMode: true,
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
  dataLabels: {
    enabled: false,
  },
  title: {
    text: "Top 10 Endpoits Mais Acessados",
    style: {
      fontSize: "20px",
      color: "#FFF",
    },
    align: "center",
  },
  fill: {
    colors: ["#FAFAFA"],
  },
  xaxis: {
    type: "category",
    labels: {
      style: {
        fontSize: "9px",
      },
    },
  },
  tooltip: {
    enabled: true,
    theme: "dark",
    shared: true,
    followCursor: false,
    intersect: false,
    inverseOrder: false,
    hideEmptySeries: true,
    fillSeriesColor: false,
    style: {
      fontSize: "11px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      highlightDataSeries: false,
    },
    x: {
      show: true,
      format: "dd MMM",
      formatter: undefined,
    },
    z: {
      formatter: "{ point.y:.1f }%",
      title: "Size: ",
    },
    marker: {
      show: true,
    },
    fixed: {
      enabled: true,
      position: "topRight",
      offsetX: 0,
      offsetY: 0,
    },
  },
  grid: {
    borderColor: "rgba(255, 255, 255, 0.12)",
    show: true,
  },
  plotOptions: {
    bar: {
      columnWidth: "60%",
    },
  },
};

const series = [
  {
    name: "Actividades Detectadas",
    data: [
      {
        x: data.value.topEndpts[0].endpoint,
        y: data.value.topEndpts[0].n_access,
      },
      {
        x: data.value.topEndpts[1].endpoint,
        y: data.value.topEndpts[1].n_access,
      },
      {
        x: data.value.topEndpts[2].endpoint,
        y: data.value.topEndpts[2].n_access,
      },
      {
        x: data.value.topEndpts[3].endpoint,
        y: data.value.topEndpts[3].n_access,
      },
      {
        x: data.value.topEndpts[4].endpoint,
        y: data.value.topEndpts[4].n_access,
      },
      {
        x: data.value.topEndpts[5].endpoint,
        y: data.value.topEndpts[5].n_access,
      },
      {
        x: data.value.topEndpts[6].endpoint,
        y: data.value.topEndpts[6].n_access,
      },
      {
        x: data.value.topEndpts[7].endpoint,
        y: data.value.topEndpts[7].n_access,
      },
      {
        x: data.value.topEndpts[8].endpoint,
        y: data.value.topEndpts[8].n_access,
      },
      {
        x: data.value.topEndpts[9].endpoint,
        y: data.value.topEndpts[9].n_access,
      },
    ],
  },
];
</script>

<template>
  <div class="p-2 py-3">
    <div>
      <apexchart
        id="por-categoria"
        height="400"
        type="bar"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </div>
  </div>
</template>
