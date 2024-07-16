<template>
  <div class="container mt-5">
    <PolarArea :options="chartOptions" :data="chartData" />
  </div>
</template>

<script lang="ts">
import { PolarArea } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default defineComponent({
  name: "PolarAreaChart",
  components: { PolarArea },
  setup() {
    const chartData = ref({
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Running"],
      datasets: [
        {
          label: "My First dataset",
          data: [65, 59, 90, 81, 56],
          backgroundColor: [
            "#ffffffb3",
            "#ffffff80",
            "#ffffff4d",
            "#ffffff1f",
            "#FFFFFF",
          ],
        },
      ],
      dataLabels: {
        enabled: false,
      },
    });

    const chartOptions = ref({
      responsive: true,
      borderWidth: 0,
      
    });

    return { chartData, chartOptions };
  },
});
</script>
