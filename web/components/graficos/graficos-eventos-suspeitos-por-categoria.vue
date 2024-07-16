<script setup lang="ts">
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
    text: "Eventos suspeitos  por Categoria, Março-2024",
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
      text: "Eventos suspeitos  por Categoria",
    },
    labels: {
      formatter: function (value) {
        return value + "%";
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
    // custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //   const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

    //   return (
    //     "<ul class='border border-white'>" +
    //     "<li><b>Price</b>: " +
    //     w+
    //     "</li>" +
    //     "<li><b>Number</b>: " +
    //     data.y +
    //     "</li>" +
    //     "<li><b>Product</b>: '" +
    //     data.product +
    //     "'</li>" +
    //     "<li><b>Info</b>: '" +
    //     data.info +
    //     "'</li>" +
    //     "<li><b>Site</b>: '" +
    //     data.site +
    //     "'</li>" +
    //     "</ul>"
    //   );
    // },
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
    // y: {
    //   formatter: undefined,
    //   title: {
    //     formatter: (seriesName) => seriesName,
    //   },
    // },
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
    name: "Eventos por Categoria",
    data: [
      {
        x: "Network",
        y: 62.74,
      },
      {
        x: "Proteção de Dados",
        y: 40.57,
      },
      {
        x: "Segurança na Cloud",
        y: 25.23,
      },
      {
        x: "Segurança Aplicacional",
        y: 10.58,
      },
    ],
  },
];
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
