<template>
  <div class="row clearfix">
    <div class="col-12">
      <div class="section_title">
        <div class="mr-3">
          <h3>Our Available Investments</h3>
          <br />
          <small>Please select investment category</small>
        </div>
      </div>
    </div>
    <div class="col-lg-12 col-md-12">
      <div class="oxfordvest_tabs">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#allInvest"
              >All</a
            >
          </li>
          <li
            class="nav-item"
            v-for="(investmentCategory, index) in investmentCategories"
            :key="index"
          >
            <a
              
              class="nav-link"
              data-toggle="tab"
              :href="`#${investmentCategory.code}`"
              >{{ investmentCategory.name }}</a
            >
          </li>
        </ul>
      </div>

      <div class="tab-content padding-0">
        <div class="tab-pane active" id="allInvest">
          <InvestmentCarousel :investments="all" />
        </div>
        <div class="tab-pane" id="agrovest">
          <InvestmentCarousel :investments="agrovest" />
        </div>
        <div class="tab-pane" id="mortgatevest">
          <InvestmentCarousel :investments="mortgatevest" />
        </div>
        <div class="tab-pane" id="buildvest">
          <InvestmentCarousel :investments="buildvest" />
        </div>
        <div class="tab-pane" id="realvest">
          <InvestmentCarousel :investments="realvest" />
        </div>
        <div class="tab-pane" id="oilvest">
          <InvestmentCarousel :investments="oilvest" />
        </div>
        <div class="tab-pane" id="kiddiesvest">
          <InvestmentCarousel :investments="kiddiesvest" />
        </div>
        <div class="tab-pane" id="homevest">
          <InvestmentCarousel :investments="homevest" />
        </div>
      </div>
    </div>
    <!-- <div class="col-12">
      <InvestmentTabs />
      <InvestmentCarousel />
    </div> -->
  </div>
</template>

<script>
// import InvestmentTabs from "./InvestmentTabs";
import InvestmentCarousel from "./InvestmentCarousel";

import "@/mixins";

import $ from "jquery";

export default {
  components: {
    // InvestmentTabs,
    InvestmentCarousel,
  },
  computed: {
    investmentCategories() {
      let catigories = this.user.availableInvestmentCategories;
      let sortedCatigories = catigories.sort(function(a,b){return a.code < b.code ? -1 : 1});
      return sortedCatigories;
    },
    all() {
      return this.user.availableInvestments;
    },
    agrovest() {
      return this.user.availableInvestments.filter(
        (investment) => investment.availableInvestmentCategoryCode == "agrovest"
      );
    },
    mortgatevest() {
      return this.user.availableInvestments.filter(
        (investment) =>
          investment.availableInvestmentCategoryCode == "mortgatevest"
      );
    },
    buildvest() {
      return this.user.availableInvestments.filter(
        (investment) =>
          investment.availableInvestmentCategoryCode == "buildvest"
      );
    },
    realvest() {
      return this.user.availableInvestments.filter(
        (investment) => investment.availableInvestmentCategoryCode == "realvest"
      );
    },
    oilvest() {
      return this.user.availableInvestments.filter(
        (investment) => investment.availableInvestmentCategoryCode == "oilvest"
      );
    },
    homevest() {
      return this.user.availableInvestments.filter(
        (investment) => investment.availableInvestmentCategoryCode == "homevest"
      );
    },
    kiddiesvest() {
      return this.user.availableInvestments.filter(
        (investment) =>
          investment.availableInvestmentCategoryCode == "kiddiesvest"
      );
    },
  },
  methods: {
    toggleActiveInvestButton: function (event) {
      $(".invest_button").removeClass("tab_active");
      let className = event.target;

      if ($(className).hasClass("tab_active")) {
        return;
      }

      $(className).addClass("tab_active");
    },
  },
};
</script>

<style></style>
