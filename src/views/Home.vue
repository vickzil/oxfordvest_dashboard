/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <PageHeader :topPageName="topPageName" />
        <OverviewCard />
        <br />
        <div class="row clearfix" v-if="user">
          <div class="col-md-12 col-sm-12 card">
            <InvestmentChart />
            <!-- <Chart2 /> -->
          </div>
        </div>
        <br />
        <UserActivities v-if="user" />
        <br />
        <br />
        <Featured />
        <br />
        <br />
        <br />
        <br />
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
import Featured from "../components/extras/featured/Featured";

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
    Featured,
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

    // var t,
    //   timeout = 50000;

    // function resetTimer() {
    //   // console.log("reset: " + new Date().toLocaleString());
    //   if (t) {
    //     window.clearTimeout(t);
    //   }
    //   t = window.setTimeout(logout, timeout);
    // }

    // function logout() {
    //   // this.logout();
    //   sessionStorage.clear();
    //   location.reload();
    //   // console.log("done: " + new Date().toLocaleString());
    // }
    // resetTimer();

    // //And bind the events to call `resetTimer()`
    // ["click", "mousemove", "keypress"].forEach(function (name) {
    //   // console.log(name);
    //   document.addEventListener(name, resetTimer);
    // });
  },
  beforeRouteLeave(to, from, next) {
    // this.showPageLoading();
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
