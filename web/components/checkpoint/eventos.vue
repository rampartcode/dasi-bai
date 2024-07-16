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
    text: "Actividades Detectadas",
    align: "center",
    style: {
      fontSize: "20px",
      color: "#fff",
    },
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
  yaxis: {
    title: {
      text: "Actividades Detectadas",
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

const series = ref([
  {
    name: "Actividades Detectadas",
    data: data?.value.records,
  },
]);

watch(data, (nData) => {
  series.value = [
    {
      name: "Actividades Detectadas",
      data: nData.records,
    },
  ];
});
</script>

<template>
  <div class="card shadow-none bg-transparent">
    <div>
      <apexchart
        id="por-categoria"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </div>
  </div>
</template>
