/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <PageHeader :topPageName="topPageName" />
        <div class="row clearfix" v-if="user">
          <div class="col-md-12">
            <div>
              <router-link
                to="/investment"
                class="btn btn-default btn-sm hrm_button"
                ><i class="fa fa-arrow-left mr-2"></i>Go back</router-link
              >
            </div>
            <br />
            <div class="card social">
              <div
                class="profile-header d-flex justify-content-between justify-content-center bg-white text-dark gradient"
              >
                <div class="d-flex">
                  <div class="details">
                    <h5 class="mb-0">
                      <!-- {{ investment.firstName }} {{ investment.lastName }} -->
                      {{ investment.availableInvestmentName }}
                    </h5>
                    <!-- <span class="text-dark">{{
                      investment.availableInvestmentName
                    }}</span> -->
                    <!-- <div>+123 456 789</div> -->
                  </div>
                </div>
                <div>
                  <!-- <button class="btn btn-default btn-sm">View Profile</button>
                  <button class="btn btn-default btn-sm">Message</button> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-5">
            <div class="card">
              <div class="body">
                <small class="text-muted">Amount Invested: </small>
                <p>{{ addComma(investment.amountInvested) }}</p>
                <hr />
                <small class="text-muted">Duration: </small>
                <p>{{ investment.duration }} Months</p>
                <hr />
                <small class="text-muted">Daily ROI: </small>
                <p>{{ investment.dailyROI }}</p>
                <hr />
                <small class="text-muted">Daily Frequency: </small>
                <p>{{ investment.frequency }}</p>
                <hr />
                <small class="text-muted">Daily No of Intervals: </small>
                <p>{{ investment.noOfIntervals }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-8 col-lg-8 col-md-7">
            <div class="card">
              <div class="body">
                <small class="text-muted">Maturity Date: </small>
                <p>{{ removeTimeZone(investment.maturityDate) }}</p>
                <hr />
                <small class="text-muted">New Interest Rate: </small>
                <p>{{ investment.newInterestRate }}</p>
                <hr />
                <small class="text-muted">Old Interest Rate: </small>
                <p class="m-b-0">{{ investment.oldInterestRate }}</p>
                <hr />
                <small class="text-muted">Old Interest Rate: </small>
                <p class="m-b-0">{{ investment.oldInterestRate }}</p>
                <hr />
                <small class="text-muted">status: </small>
                <p class="m-b-0">{{ investment.status }}</p>
                <!-- {{ investment }} -->
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <!-- <div class="row clearfix">
          <div class="col-md-12">
            <Chart2 />
          </div>
        </div> -->

        <br /><br /><br />
      </div>
    </div>
  </div>
</template>
<script>
// import Navbar from "@/components/navbar/Navbar";
import PageHeader from "../components/header/PageHeader";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
// import Chart2 from "../components/charts/Chart2";
import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "Investment",
  // props: ["id"],
  components: {
    PageLoadingOverlay,
    PageHeader,
    // Chart2,
  },

  data() {
    return {
      topPageName: "Investment",
    };
  },
  computed: {
    investment() {
      let investmentCode = this.$route.query.code;
      return this.$store.getters.investmentByCode(investmentCode);
    },
  },

  methods: {
    ...mapActions(["currentSitePage", "closePageLoading", "showPageLoading"]),
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },
    hasHistory: function () {
      return window.history.length > 2;
    },
  },
  mounted() {
    this.currentSitePage("/investment");
    this.closePageLoading();
  },
  beforeRouteLeave(to, from, next) {
    // this.showPageLoading();
    this.removeOffcanvas();
    next();
  },
};
</script>
<style scoped></style>
