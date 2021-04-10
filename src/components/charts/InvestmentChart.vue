<template>
  <section class="charts">
    <br /><br />
    <!-- <h3 class="mb-5">Investment Chart</h3> -->
    <vue-highcharts
      :highcharts="Highcharts"
      :options="investmentOptions"
      ref="drilldownChart"
    ></vue-highcharts>
  </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import Drilldown from "highcharts/modules/drilldown.js";
import Highcharts from "highcharts";

Drilldown(Highcharts);
Highcharts.setOptions({
  lang: {
    drillUpText: "back",
  },
});

import { mapGetters } from "vuex";

export default {
  components: {
    VueHighcharts,
  },
  data() {
    return {
      Highcharts: Highcharts,
    };
  },
  computed: {
    ...mapGetters(["investmentOptions"]),
  },

  mounted() {
    let chartCredits = document.querySelector(".highcharts-credits");
    chartCredits.innerHTML = "";
  },
};
</script>

<style scoped>
.highcharts-credits {
  display: none !important;
}
</style>
