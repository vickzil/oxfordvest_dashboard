/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <PageHeader :topPageName="topPageName" />

        <!-- <div class="row section_div clearfix">
          <div class="col-12">
            <div class="section_title">
              <div class="mr-3">
                <h3>Overview</h3>
                 <small>Statistics, Predictive Analytics Data Visualization, Big Data Analytics, etc.</small> 
              </div>
              <div>
              </div>
            </div>
          </div>
        </div> -->
        <OverviewCard />
        <br />
        <!-- <div class="row clearfix">
          <div class="col-md-6 col-sm-12">
            <Chart />
          </div>
          <div class="col-md-6 col-sm-12">
            <AvailableInvestmentChart />
          </div>
        </div>
        <br /><br /> -->
        <div class="row clearfix">
          <div class="col-md-12 col-sm-12 card">
            <InvestmentChart />
            <!-- <Chart2 /> -->
          </div>
        </div>
        <br />
        <UserActivities />
        <br /><br />
      </div>
    </div>
  </div>
</template>
<script>
// import Map from "../components/charts/Map";
// import Navbar from "@/components/navbar/Navbar";
import PageHeader from "../components/header/PageHeader";
import OverviewCard from "../components/extras/homeComponents/OverviewCard";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";

// import Chart from "../components/charts/Chart";
// import AvailableInvestmentChart from "../components/charts/AvailableInvestmentChart";
// import Chart2 from "../components/charts/Chart2";
import InvestmentChart from "../components/charts/InvestmentChart";
import UserActivities from "../components/extras/userActivities/UserActivities";

import "@/mixins";
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    // Navbar,
    PageHeader,
    OverviewCard,
    PageLoadingOverlay,
    UserActivities,
    InvestmentChart,
    // Chart,
    // Chart2,
    // AvailableInvestmentChart,
  },

  data() {
    return {
      topPageName: "Hi, Welcomeback!",
    };
  },

  methods: {
    ...mapActions(["currentSitePage", "closePageLoading", "showPageLoading"]),
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },
    checkCurrentRoute() {
      if (this.$store.getters.checkCurrentRoute == true) {
        this.checkCurrentRout = true;
      } else {
        this.checkCurrentRout = false;
      }
    },

    handler() {
      var args = arguments;
      for (var arg of args) {
        if (arg instanceof Function) {
          arg();
        }
      }
    },
  },
  mounted() {
    this.currentSitePage(this.$router.history.current.path);
    this.closePageLoading();
    this.checkCurrentRoute();
  },
  beforeRouteLeave(to, from, next) {
    this.showPageLoading();
    this.removeOffcanvas();
    next();
  },
};
</script>
<style scoped>
.section_div .section_title h1 {
  color: #434900 !important;
  text-shadow: 0 1px 2px rgb(58, 45, 49);
}
</style>
