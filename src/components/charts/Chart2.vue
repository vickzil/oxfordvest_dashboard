<template>
  <div class="card">
    <br />
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
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
          text: "Current Investment Growth",
        },
        subtitle: {
          text: "Investment growth",
        },
        xAxis: {
          title: {
            text: "Investment rate",
          },

          tickInterval: 1,
        },
        yAxis: [
          {
            //--- Primary yAxis
            title: {
              text: "Interest",
            },
          },
          {
            //--- Secondary yAxis
            title: {
              text: "expenditure",
            },
            opposite: true,
          },
        ],
        series: [
          {
            yAxis: 0,
            data: [
              49.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4,
            ],
          },
          {
            yAxis: 1,
            data: [
              7.0,
              6.9,
              9.5,
              14.5,
              18.2,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6,
            ],
          },
        ],
      },
    };
  },
};
</script>
