<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";

exportingInit(Highcharts);

export default {
  data() {
    return {
      chartOptions: {
        title: {
          text: "My Total Savings",
        },
        subtitle: {
          text: "Stock Savings",
        },
        xAxis: {
          title: {
            text: "Savings rate",
          },
          tickInterval: 1,
        },
        yAxis: {
          title: {
            text: "Savings scale",
          },
          tickInterval: 1,
        },
        series: [
          {
            data: [1, 2, 2, 4, 7, 3],
          },
        ],
      },
    };
  },
};
</script>
